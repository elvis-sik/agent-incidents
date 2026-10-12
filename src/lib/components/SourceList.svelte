<script lang="ts">
  import type { Source } from '$lib/content/schema';
  import { formatDate } from '$lib/timeline';
  import SourceKind from './SourceKind.svelte';

  let { sources, demo, incidentId, headingId, showDates = true, showEvidenceNotes = false }: {
    sources: Source[];
    demo: boolean;
    incidentId?: string;
    headingId?: string;
    showDates?: boolean;
    showEvidenceNotes?: boolean;
  } = $props();
</script>

{#snippet reference(source: Source)}
  {#if demo}
    <span class="placeholder-source">{source.label}</span>
  {:else}
    <a href={source.url}>{source.label}<span aria-hidden="true"> ↗</span></a>
  {/if}
{/snippet}

<ol class="sources" class:featured={!!headingId} aria-label="Sources">
  {#each sources as source, index (source.id)}
    <li id={incidentId ? `source--${incidentId}--${source.id}` : undefined}>
      {#if !headingId}<span class="source-number" aria-hidden="true">{index + 1}</span>{/if}
      <div class="source-content">
        {#if headingId}<h3 id={headingId}>{@render reference(source)}</h3>{:else}<div class="source-label">{@render reference(source)}</div>{/if}
        <div class="source-meta">
          <SourceKind kind={source.kind} />
          <span class="publisher">{source.publisher}</span>
          {#if showDates}<span class="source-date">{#if source.publishedDate}<time datetime={source.publishedDate}>{formatDate(source.publishedDate)}</time>{:else}Publication date unknown{/if}</span>{/if}
          {#if demo}<span class="source-note">Example</span>{/if}
        </div>
        {#if showEvidenceNotes && source.evidenceNote}<p class="evidence-note">{source.evidenceNote}</p>{/if}
      </div>
    </li>
  {/each}
</ol>

<style>
  .evidence-note { margin: 6px 0 0; font-size: 13px; line-height: 1.5; color: var(--secondary); }
  .sources { list-style: none; margin: 20px 0 0; padding: 0; font-size: 16px; line-height: 1.5; }
  li { display: flex; gap: 12px; scroll-margin-top: 32px; border-radius: 2px; }
  li + li { margin-top: 14px; }
  li:target { outline: 2px solid var(--ink); outline-offset: 7px; }
  .source-number { flex: 0 0 16px; padding-top: 2px; font-size: 13px; color: var(--secondary); font-variant-numeric: tabular-nums; }
  .source-content { min-width: 0; }
  .source-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 3px 12px; margin-top: 4px; color: var(--secondary); font-size: 13px; line-height: 1.5; }
  .publisher { overflow-wrap: anywhere; }
  a { text-decoration-thickness: 1px; overflow-wrap: anywhere; }
  .placeholder-source { overflow-wrap: anywhere; }
  .source-note { color: var(--secondary); }
  .featured { margin: 0; }
  .featured .source-meta { margin-top: 10px; font-size: 14px; }
  h3 { margin: 0; font-size: 24px; font-weight: 650; line-height: 1.25; letter-spacing: -0.025em; overflow-wrap: anywhere; }
  @media (max-width: 639px) {
    .sources { font-size: 16px; }
    h3 { font-size: 22px; line-height: 1.3; }
  }
</style>
