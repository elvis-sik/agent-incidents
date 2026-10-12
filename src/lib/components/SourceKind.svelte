<script lang="ts">
  import { sourceKinds, type SourceKind } from '$lib/content/source-kinds';
  let { kind }: { kind: SourceKind } = $props();

  const paths: Record<SourceKind, string> = {
    'official-report': 'M5 3h10l4 4v14H5z M15 3v5h4 M8 12h8 M8 16h6',
    'independent-research': 'M9 3h6 M10 3v6l-6 10a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2L14 9V3 M8 15h8',
    'news-article': 'M4 4h16v16H4z M8 8h8 M8 12h3 M14 12h2 M8 16h3 M14 16h2',
    paper: 'M4 4h7l1 2 1-2h7v16h-7l-1 1-1-1H4z M12 6v15 M7 8h2 M15 8h2 M7 12h2 M15 12h2',
    video: 'M4 5h16v14H4z M10 9l5 3-5 3z',
    repository: 'M8 7l-5 5 5 5 M16 7l5 5-5 5 M14 4l-4 16',
    discussion: 'M4 4h16v12H9l-5 4z M8 8h8 M8 12h5',
    other: 'M10 7l2-2a5 5 0 0 1 7 7l-2 2 M14 17l-2 2a5 5 0 0 1-7-7l2-2 M8 16l8-8'
  };
</script>

<span class="source-kind">
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d={paths[kind]} /></svg>
  <span>{sourceKinds[kind].label}</span>
</span>

<style>
  .source-kind { display: inline-flex; align-items: center; gap: 6px; }
  svg { flex: 0 0 16px; }
</style>
