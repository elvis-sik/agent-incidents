import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, basename } from 'node:path';
import { z } from 'zod';
import { incidentSchema, providerSchema, type Incident, type Provider } from '../content/schema';

export interface Collection { incidents: Incident[]; providers: Provider[]; demo: boolean }
export interface ContentFile { file: string; data: unknown }
const placeholderId = /^(example|demo|fixture|sample|placeholder)(-|$)/i;
const placeholderHost = /(^|\.)(example\.(com|org|net)|example|invalid|test|localhost)$/i;

function parse<T>(schema: z.ZodType<T>, data: unknown, file: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.issues.map((issue) => `${file}: ${issue.path.join('.') || '<root>'}: ${issue.message}`).join('\n'));
  }
  return result.data;
}

/** Validation is deliberately strict: private research fields cannot be silently published. */
export function validateCollection(providerFile: ContentFile, files: ContentFile[], demo = false): Collection {
  const providers = parse(z.array(providerSchema), providerFile.data, providerFile.file);
  const providerIds = new Set<string>();
  providers.forEach((provider, index) => {
    if (providerIds.has(provider.id)) throw new Error(`${providerFile.file}: ${index}.id: Duplicate provider ID ${provider.id}`);
    if (!demo && placeholderId.test(provider.id)) throw new Error(`${providerFile.file}: ${index}.id: Placeholder provider is not allowed in production`);
    providerIds.add(provider.id);
  });
  const ids = new Set<string>();
  const incidents = files.map(({ file, data }) => {
    const incident = parse(incidentSchema, data, file);
    if (ids.has(incident.id)) throw new Error(`${file}: id: Duplicate incident ID ${incident.id}`);
    ids.add(incident.id);
    if (basename(file, '.json') !== incident.id) throw new Error(`${file}: id: Filename must match incident ID ${incident.id}`);
    incident.providerIds.forEach((id, index) => {
      if (!providerIds.has(id)) throw new Error(`${file}: providerIds.${index}: Unknown provider ${id}`);
    });
    incident.evaluatorIds.forEach((id, index) => {
      if (!providerIds.has(id)) throw new Error(`${file}: evaluatorIds.${index}: Unknown evaluator ${id}`);
    });
    if (!demo) {
      if (placeholderId.test(incident.id) || /\b(illustrative placeholder|not a real incident|fictional incident)\b/i.test(`${incident.title} ${incident.summary}`)) {
        throw new Error(`${file}: id: Placeholder incident is not allowed in production`);
      }
      incident.sources.forEach((source, index) => {
        const host = new URL(source.url).hostname;
        if (placeholderHost.test(host) || host === '127.0.0.1' || host === '[::1]') throw new Error(`${file}: sources.${index}.url: Placeholder source host is not allowed in production`);
      });
    }
    return incident;
  });
  return { incidents, providers, demo };
}

/** Surprising supported chronology needs editorial review, not record deletion. */
export function chronologyWarnings(incident: Incident, file: string): string[] {
  const date = incident.incidentDate;
  let field: string | null = null;
  if (date.kind === 'exact' && date.date > incident.reportedDate) field = 'date';
  if (date.kind === 'range' && date.start > incident.reportedDate) field = 'start';
  if (date.kind === 'month' && date.month > incident.reportedDate.slice(0, 7)) field = 'month';
  return field
    ? [`${file}: incidentDate.${field}: Evidence review needed: incident begins after reportedDate (${incident.reportedDate}); the supported record is retained.`]
    : [];
}

async function readJSON(file: string): Promise<ContentFile> {
  let data: unknown;
  try { data = JSON.parse(await readFile(file, 'utf8')); }
  catch (error) { throw new Error(`${file}: <root>: Cannot read JSON: ${error instanceof Error ? error.message : String(error)}`); }
  return { file, data };
}

export async function loadCollection({ demo }: { demo: boolean }): Promise<Collection> {
  const root = resolve(process.cwd(), demo ? 'tests/fixtures' : 'content');
  const directory = resolve(root, 'incidents');
  const names = (await readdir(directory)).filter((name) => name.endsWith('.json')).sort();
  const [providerFile, files] = await Promise.all([
    readJSON(resolve(root, 'providers.json')),
    Promise.all(names.map((name) => readJSON(resolve(directory, name))))
  ]);
  const collection = validateCollection(providerFile, files, demo);
  for (const [index, provider] of collection.providers.entries()) {
    if (!provider.logoPath) continue;
    const file = resolve(process.cwd(), 'static', provider.logoPath.slice(1));
    try {
      if (!(await stat(file)).isFile()) throw new Error('Not a file');
    } catch {
      throw new Error(`${providerFile.file}: ${index}.logoPath: Local provider logo does not exist: ${provider.logoPath}`);
    }
  }
  collection.incidents.forEach((incident, index) => {
    for (const warning of chronologyWarnings(incident, files[index].file)) console.warn(warning);
  });
  return collection;
}
