import { describe, expect, it } from 'vitest';
import { incidentSchema, isCalendarDate, providerSchema, sourceSchema, type Incident } from '../../src/lib/content/schema';
import { chronologyWarnings, loadCollection, validateCollection } from '../../src/lib/server/content';
import example from '../fixtures/incidents/example-incident-a.json';

const record = (): Incident => structuredClone(example) as Incident;
const registry = { file: 'providers.json', data: [{ id: 'example-lab-a', name: 'Example lab A' }] };
const validate = (data: unknown) => validateCollection(registry, [{ file: 'example-incident-a.json', data }], true);

describe('public content contract', () => {
  it('accepts only real calendar days, including century leap-year rules', () => {
    for (const date of ['2024-02-29', '2000-02-29', '2026-12-31', '0001-01-01']) expect(isCalendarDate(date)).toBe(true);
    for (const date of ['2026-02-29', '1900-02-29', '2026-04-31', '0000-01-01', '2026-00-12', '2026-01-00', '2026-1-01', '2026-09-12T00:00:00Z']) expect(isCalendarDate(date)).toBe(false);
  });
  it('loads fictional fixtures separately from validated production records', async () => {
    const demo = await loadCollection({ demo: true });
    expect(demo.incidents).toHaveLength(7);
    expect(demo.providers.filter((p) => p.id !== 'unknown').every((p) => p.id.startsWith('example-'))).toBe(true);
    const production = await loadCollection({ demo: false });
    expect(production.incidents.every((incident) => !incident.id.startsWith('example-'))).toBe(true);
    expect(production.demo).toBe(false);
    expect(Object.keys(production).sort()).toEqual(['demo', 'incidents', 'providers']);
  });
  it('rejects impossible dates with a file and field', () => {
    const value = record(); value.reportedDate = '2026-02-30';
    expect(() => validate(value)).toThrow(/example-incident-a.json: reportedDate:/);
  });
  it('requires visible sources and valid internal date evidence', () => {
    const value = record(); value.sources = [];
    expect(incidentSchema.safeParse(value).success).toBe(false);
    const broken = record(); broken.incidentDate = { kind: 'exact', date: '2026-09-12', sourceIds: ['missing'] };
    expect(() => validate(broken)).toThrow(/incidentDate.sourceIds.0/);
    broken.incidentDate = { kind: 'unknown' }; broken.reportedDateSourceId = 'missing';
    expect(() => validate(broken)).toThrow(/reportedDateSourceId/);
  });
  it('validates the shared source-kind vocabulary', () => {
    const source = record().sources[0];
    for (const kind of ['official-report', 'independent-research', 'news-article', 'paper', 'video', 'repository', 'discussion', 'other']) {
      expect(sourceSchema.safeParse({ ...source, kind }).success).toBe(true);
    }
    expect(sourceSchema.safeParse({ ...source, kind: 'article' }).success).toBe(false);
    expect(sourceSchema.safeParse({ ...source, id: 'a--b' }).success).toBe(false);
  });
  it('requires a dated reporting source matching the reporting date', () => {
    const value = record(); delete value.sources[0].publishedDate;
    expect(() => validate(value)).toThrow(/supported publishedDate/);
    value.sources[0].publishedDate = '2026-09-19';
    expect(() => validate(value)).toThrow(/Must match/);
  });
  it('allows an ongoing range to end after its first report, but rejects reversed ranges', () => {
    const value = record(); value.incidentDate = { kind: 'range', start: '2026-09-01', end: '2026-09-30', sourceIds: ['example-report'] };
    expect(incidentSchema.safeParse(value).success).toBe(true);
    value.incidentDate.start = '2026-10-01';
    expect(() => validate(value)).toThrow(/incidentDate.end/);
  });
  it('validates optional approximate chronology anchors without changing date precision', () => {
    const value = record();
    value.incidentDate = { kind: 'approximate', label: 'Early September 2026', sortDate: '2026-09-01', sourceIds: ['example-report'], evidenceNote: 'The report supports the beginning of September.' };
    expect(validate(value).incidents[0].incidentDate).toEqual(value.incidentDate);
    for (const invalid of ['2026-02-30', '2026-09', 'September 2026', '2026-09-01T00:00:00Z']) {
      value.incidentDate.sortDate = invalid;
      expect(() => validate(value)).toThrow(/incidentDate.sortDate/);
    }
    delete value.incidentDate.sortDate;
    expect(validate(value).incidents[0].incidentDate).toEqual(value.incidentDate);
    value.incidentDate.sourceIds = ['missing'];
    expect(() => validate(value)).toThrow(/incidentDate.sourceIds.0/);
    const unknown = { ...record(), incidentDate: { kind: 'unknown', sortDate: '2026-09-01' } };
    expect(() => validate(unknown)).toThrow(/Unrecognized key/);
  });
  it('rejects duplicate sources, providers and incidents', () => {
    const value = record(); value.sources.push(value.sources[0]);
    expect(() => validate(value)).toThrow(/Duplicate source ID/);
    expect(() => validateCollection({ ...registry, data: [...registry.data, ...registry.data] }, [], true)).toThrow(/Duplicate provider ID/);
    expect(() => validateCollection(registry, [{ file: 'example-incident-a.json', data: record() }, { file: 'nested/example-incident-a.json', data: record() }], true)).toThrow(/Duplicate incident ID/);
    value.sources.pop(); value.providerIds.push(value.providerIds[0]);
    expect(() => validate(value)).toThrow(/Provider IDs must be unique/);
  });
  it('rejects unknown providers, unsafe URLs and mismatched filenames', () => {
    const value = record(); value.providerIds = ['missing'];
    expect(() => validate(value)).toThrow(/providerIds.0: Unknown provider/);
    value.providerIds = ['example-lab-a']; value.sources[0].url = 'javascript:alert(1)';
    expect(() => validate(value)).toThrow(/sources.0.url/);
    expect(() => validateCollection(registry, [{ file: 'wrong.json', data: record() }], true)).toThrow(/Filename must match/);
  });
  it('keeps an unknown provider explicit and unaffiliated', () => {
    expect(providerSchema.safeParse({ id: 'unknown', name: 'Unknown provider' }).success).toBe(true);
    expect(providerSchema.safeParse({ id: 'unknown', name: 'OpenAI' }).success).toBe(false);
    expect(providerSchema.safeParse({ id: 'unknown', name: 'Unknown provider', logoPath: '/providers/openai.svg' }).success).toBe(false);
  });
  it('rejects private fields at every object level rather than leaking them', () => {
    const value = record();
    expect(() => validate({ ...value, privateNotes: 'DO NOT PUBLISH' })).toThrow(/Unrecognized key/);
    expect(() => validate({ ...value, sources: [{ ...value.sources[0], rawResearch: 'private' }] })).toThrow(/Unrecognized key/);
    expect(() => validate({ ...value, incidentDate: { kind: 'unknown', date: '2026-09-12' } })).toThrow(/Unrecognized key/);
    expect(() => validateCollection({ ...registry, data: [{ ...registry.data[0], privateNotes: 'private' }] }, [], true)).toThrow(/Unrecognized key/);
    const event = value.events[0];
    expect(() => validate({ ...value, events: [{ ...event, date: { ...event.date, privateNotes: 'private' } }] })).toThrow(/Unrecognized key/);
  });
  it('blocks placeholder providers, records and hosts from production', () => {
    expect(() => validateCollection(registry, [], false)).toThrow(/Placeholder provider/);
    const provider = { file: 'providers.json', data: [{ id: 'real-lab', name: 'Real lab' }] };
    const value = record(); value.providerIds = ['real-lab'];
    expect(() => validateCollection(provider, [{ file: 'example-incident-a.json', data: value }])).toThrow(/Placeholder incident/);
    value.id = 'record-a'; value.title = 'A sourced record'; value.summary = 'A reviewed account.';
    for (const host of ['example.invalid', 'example.com', 'sub.example.org', 'localhost', 'service.test', 'service.example']) {
      value.sources[0].url = `https://${host}/source`;
      expect(() => validateCollection(provider, [{ file: 'record-a.json', data: value }])).toThrow(/Placeholder source host/);
    }
  });
});


describe('chronology evidence review', () => {
  it('flags exact dates, range starts and months after reporting without rejecting records', () => {
    const values: Incident['incidentDate'][] = [
      { kind: 'exact', date: '2026-09-19', sourceIds: ['example-report'] },
      { kind: 'range', start: '2026-09-19', end: '2026-09-30', sourceIds: ['example-report'] },
      { kind: 'month', month: '2026-10', sourceIds: ['example-report'] }
    ];
    for (const [index, date] of values.entries()) {
      const value = record(); value.incidentDate = date;
      expect(validate(value).incidents).toHaveLength(1);
      const warning = chronologyWarnings(value, 'example-incident-a.json');
      expect(warning).toHaveLength(1);
      expect(warning[0]).toContain(`example-incident-a.json: incidentDate.${['date', 'start', 'month'][index]}:`);
      expect(warning[0]).toContain('Evidence review needed');
    }
  });
  it('does not flag ongoing ranges, overlapping months or unspecified dates', () => {
    const values: Incident['incidentDate'][] = [
      { kind: 'exact', date: '2026-09-18', sourceIds: ['example-report'] },
      { kind: 'range', start: '2026-09-01', end: '2026-09-30', sourceIds: ['example-report'] },
      { kind: 'month', month: '2026-09', sourceIds: ['example-report'] },
      { kind: 'approximate', label: 'Autumn 2026', sourceIds: ['example-report'] },
      { kind: 'unknown' }
    ];
    for (const date of values) {
      const value = record(); value.incidentDate = date;
      expect(chronologyWarnings(value, 'example-incident-a.json')).toEqual([]);
    }
  });
  it('allows older background sources without replacing the supported reporting date', () => {
    const value = record();
    value.sources.push({ ...value.sources[0], id: 'background', publishedDate: '2026-01-01' });
    expect(validate(value).incidents[0].reportedDate).toBe('2026-09-18');
    expect(chronologyWarnings(value, 'example-incident-a.json')).toEqual([]);
  });
});


describe('incident event evidence', () => {
  it('defaults omitted events to an empty collection without changing curated dates', () => {
    const { events: _events, ...value } = record();
    const parsed = validate(value).incidents[0];
    expect(parsed.events).toEqual([]);
    expect(parsed.incidentDate).toEqual(value.incidentDate);
    expect(parsed.reportedDate).toBe(value.reportedDate);
    expect(() => validate({ ...value, events: null })).toThrow(/events/);
  });
  it('retains authored event dates independently of the parent incident date', () => {
    const value = record();
    value.events[0].date = { kind: 'exact', date: '2026-08-01', sourceIds: ['example-report'] };
    const parsed = validate(value).incidents[0];
    expect(parsed.events[0].date).toEqual(value.events[0].date);
    expect(parsed.incidentDate).toEqual(value.incidentDate);
    expect(parsed.reportedDate).toBe('2026-09-18');
  });
  it('rejects invalid event dates and unsupported event or date citations with field paths', () => {
    const value = record();
    value.events[0].date = { kind: 'exact', date: '2026-02-30', sourceIds: ['example-report'] };
    expect(() => validate(value)).toThrow(/events.0.date.date/);
    value.events[0].date = { kind: 'unknown' };
    value.events[0].sourceIds = ['missing'];
    expect(() => validate(value)).toThrow(/events.0.sourceIds.0/);
    value.events[0].date = { kind: 'exact', date: '2026-09-12', sourceIds: ['missing'] };
    expect(() => validate(value)).toThrow(/events.0.date.sourceIds.0/);
  });
  it('requires evidence even when the event date is unknown', () => {
    const value = record();
    value.events[0].date = { kind: 'unknown' };
    value.events[0].sourceIds = [];
    expect(() => validate(value)).toThrow(/events.0.sourceIds/);
  });
  it('requires known date evidence to be present among the rendered event citations', () => {
    const value = record();
    value.events[0].date = { kind: 'exact', date: '2026-09-12', sourceIds: ['example-follow-up'] };
    value.events[0].sourceIds = ['example-report'];
    expect(() => validate(value)).toThrow(/Date evidence must also appear in the event sourceIds/);
  });
  it('rejects duplicate event IDs and citations, and private event fields', () => {
    const value = record();
    value.events[1].id = value.events[0].id;
    expect(() => validate(value)).toThrow(/events.1.id: Duplicate event ID/);
    const duplicates = record(); duplicates.events[0].sourceIds.push(duplicates.events[0].sourceIds[0]);
    expect(() => validate(duplicates)).toThrow(/Source IDs must be unique/);
    const privateValue = record();
    expect(() => validate({ ...privateValue, events: [{ ...privateValue.events[0], privateNotes: 'internal review' }] })).toThrow(/Unrecognized key/);
  });
  it('scopes event IDs to their incident', () => {
    const a = record();
    const b = { ...record(), id: 'example-other-incident' };
    expect(validateCollection(registry, [{ file: 'example-incident-a.json', data: a }, { file: 'example-other-incident.json', data: b }], true).incidents).toHaveLength(2);
  });
});
