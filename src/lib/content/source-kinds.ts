/** Shared public labels only; validation stays in the build-time schema. */
export const SOURCE_KINDS = [
  'official-report', 'independent-research', 'news-article', 'paper',
  'video', 'repository', 'discussion', 'other'
] as const;

export type SourceKind = (typeof SOURCE_KINDS)[number];

export const sourceKinds: Record<SourceKind, { label: string }> = {
  'official-report': { label: 'Official report' },
  'independent-research': { label: 'Independent research' },
  'news-article': { label: 'News article' },
  paper: { label: 'Paper' },
  video: { label: 'Video' },
  repository: { label: 'Repository' },
  discussion: { label: 'Discussion' },
  other: { label: 'Other source' }
};
