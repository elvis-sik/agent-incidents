import { z } from 'zod';
import { SOURCE_KINDS } from './source-kinds';

const text = z.string().trim().min(1, 'Must not be empty');
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase, hyphen-separated ID');

/** Calendar validation does not parse through a local timezone. */
export function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  return day <= [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

export const calendarDateSchema = z.string().refine(isCalendarDate, 'Expected a valid YYYY-MM-DD calendar date');
const sourceIds = z.array(slug).min(1).refine((ids) => new Set(ids).size === ids.length, 'Source IDs must be unique');
const evidenceNote = text.optional();
export const incidentDateSchema = z.discriminatedUnion('kind', [
  z.strictObject({ kind: z.literal('exact'), date: calendarDateSchema, sourceIds, evidenceNote }),
  z.strictObject({ kind: z.literal('month'), month: z.string().regex(/^(?!0000)\d{4}-(0[1-9]|1[0-2])$/, 'Expected a valid YYYY-MM month'), sourceIds, evidenceNote }),
  z.strictObject({ kind: z.literal('range'), start: calendarDateSchema, end: calendarDateSchema, sourceIds, evidenceNote }),
  z.strictObject({ kind: z.literal('approximate'), label: text, sortDate: calendarDateSchema.optional(), sourceIds, evidenceNote }),
  z.strictObject({ kind: z.literal('unknown') })
]).superRefine((date, ctx) => {
  if (date.kind === 'range' && date.start > date.end) {
    ctx.addIssue({ code: 'custom', path: ['end'], message: 'Range end must be on or after its start' });
  }
});

export const providerSchema = z.strictObject({
  id: slug,
  name: text,
  logoPath: z.string().regex(/^\/providers\/[a-zA-Z0-9_-]+\.svg$/, 'Expected a local /providers/name.svg path').optional()
}).superRefine((provider, ctx) => {
  if (provider.id === 'unknown' && provider.name !== 'Unknown provider') ctx.addIssue({ code: 'custom', path: ['name'], message: 'Use Unknown provider for the unknown registry entry' });
  if (provider.id === 'unknown' && provider.logoPath) ctx.addIssue({ code: 'custom', path: ['logoPath'], message: 'Unknown provider must not have an affiliated logo' });
});

export const sourceSchema = z.strictObject({
  id: slug,
  label: text,
  publisher: text,
  kind: z.enum(SOURCE_KINDS),
  url: z.url().refine((value) => /^https?:\/\//i.test(value), 'Source URL must use HTTP or HTTPS'),
  publishedDate: calendarDateSchema.optional(),
  evidenceNote
});

export const incidentEventSchema = z.strictObject({
  id: slug,
  title: text,
  summary: text,
  date: incidentDateSchema,
  sourceIds
}).superRefine((event, ctx) => {
  if (event.date.kind !== 'unknown') {
    event.date.sourceIds.forEach((id, index) => {
      if (!event.sourceIds.includes(id)) ctx.addIssue({ code: 'custom', path: ['date', 'sourceIds', index], message: 'Date evidence must also appear in the event sourceIds' });
    });
  }
});

export const incidentSchema = z.strictObject({
  id: slug,
  title: text,
  summary: text,
  context: z.enum(['external-deployment', 'internal-deployment', 'training', 'evaluation', 'mixed', 'unknown']),
  contextEvidence: text.optional(),
  providerIds: z.array(slug).min(1).refine((ids) => new Set(ids).size === ids.length, 'Provider IDs must be unique'),
  incidentDate: incidentDateSchema,
  reportedDate: calendarDateSchema,
  reportedDateSourceId: slug,
  reportedDateEvidence: text.optional(),
  sources: z.array(sourceSchema).min(1),
  events: z.array(incidentEventSchema).default([]),
  updatedDate: calendarDateSchema.optional()
}).superRefine((incident, ctx) => {
  const sources = new Map<string, (typeof incident.sources)[number]>();
  incident.sources.forEach((source, index) => {
    if (sources.has(source.id)) ctx.addIssue({ code: 'custom', path: ['sources', index, 'id'], message: 'Duplicate source ID' });
    sources.set(source.id, source);
  });
  const eventIds = new Set<string>();
  incident.events.forEach((event, eventIndex) => {
    if (eventIds.has(event.id)) ctx.addIssue({ code: 'custom', path: ['events', eventIndex, 'id'], message: 'Duplicate event ID in this incident' });
    eventIds.add(event.id);
    event.sourceIds.forEach((id, index) => {
      if (!sources.has(id)) ctx.addIssue({ code: 'custom', path: ['events', eventIndex, 'sourceIds', index], message: 'Must reference a source in this record' });
    });
    if (event.date.kind !== 'unknown') {
      event.date.sourceIds.forEach((id, index) => {
        if (!sources.has(id)) ctx.addIssue({ code: 'custom', path: ['events', eventIndex, 'date', 'sourceIds', index], message: 'Must reference a source in this record' });
      });
    }
  });
  const report = sources.get(incident.reportedDateSourceId);
  if (!report) ctx.addIssue({ code: 'custom', path: ['reportedDateSourceId'], message: 'Must reference a source in this record' });
  else if (!report.publishedDate) ctx.addIssue({ code: 'custom', path: ['reportedDateSourceId'], message: 'The reporting source must have a supported publishedDate' });
  else if (report.publishedDate !== incident.reportedDate) ctx.addIssue({ code: 'custom', path: ['reportedDate'], message: 'Must match the reporting source publishedDate' });
  if (incident.incidentDate.kind !== 'unknown') {
    incident.incidentDate.sourceIds.forEach((id, index) => {
      if (!sources.has(id)) ctx.addIssue({ code: 'custom', path: ['incidentDate', 'sourceIds', index], message: 'Must reference a source in this record' });
    });
  }
});

export type Incident = z.infer<typeof incidentSchema>;
export type IncidentDate = z.infer<typeof incidentDateSchema>;
export type Provider = z.infer<typeof providerSchema>;

export type Source = z.infer<typeof sourceSchema>;

export type IncidentEvent = z.infer<typeof incidentEventSchema>;
