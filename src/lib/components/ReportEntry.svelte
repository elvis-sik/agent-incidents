<script lang="ts">
  import type { Incident, Provider, Source } from '$lib/content/schema';
  import { formatIncidentDate, CONTEXT_LABELS } from '$lib/timeline';
  import SourceList from './SourceList.svelte';

  let { id, incident, providers, source, demo, incidentHref }: {
    id: string;
    incident: Incident;
    providers: Provider[];
    source: Source;
    demo: boolean;
    incidentHref: string;
  } = $props();
  let displayedProviders = $derived(incident.providerIds.map((id) => providers.find((provider) => provider.id === id)!));
</script>

<article {id} aria-labelledby={`${id}-title`} class:unknown={!source.publishedDate}>
  <span class="node" aria-hidden="true"></span>
  <div class="content">
    <SourceList sources={[source]} {demo} headingId={`${id}-title`} showDates={false} />
    <p class="provider-names"><span class="provider-label">{displayedProviders.length === 1 ? 'Provider' : 'Providers'}</span>{#each displayedProviders as provider (provider.id)}<span class="provider">{#if provider.logoPath}<img src={provider.logoPath} alt="" width="18" height="18" />{/if}{provider.name}</span>{/each}</p>
    <p class="context-label">{CONTEXT_LABELS[incident.context]}</p>
    <p class="context"><span>Incident</span> {incident.title}</p>
    <div class="entry-links"><a class="incident-link" href={incidentHref}>View incident and all sources<span aria-hidden="true"> →</span></a><a class="report-permalink" href={`#${id}`} aria-label={`Permalink to ${source.label}`}>Permalink</a></div>
  </div>
  <dl class="dates">
    <div><dt>Incident</dt><dd>{formatIncidentDate(incident.incidentDate)}</dd></div>
  </dl>
</article>

<style>
  .context-label { margin: 8px 0 0; font-size: 13px; line-height: 1.5; color: var(--secondary); }
  article { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) 180px; gap: 0 48px; scroll-margin-top: 32px; }
  .node { position: absolute; top: 7px; left: -37px; width: 11px; height: 11px; background: var(--ink); border: 1px solid var(--ink); border-radius: 50%; }
  .unknown .node { background: var(--paper); }
  .provider-names { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 12px; margin: 16px 0 0; font-size: 14px; line-height: 1.5; }
  .provider-label { color: var(--secondary); }
  .provider { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; }
  .provider img { object-fit: contain; }
  .context { margin: 4px 0 6px; font-size: 16px; line-height: 1.5; overflow-wrap: anywhere; }
  .context span { color: var(--secondary); margin-right: 6px; }
  .entry-links { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 24px; margin-top: 8px; font-size: 14px; line-height: 1.6; }
  .entry-links a { padding: 4px 0; }
  .report-permalink { color: var(--secondary); }
  article:target { outline: 2px solid var(--ink); outline-offset: 12px; }
  .dates { margin: 0; border-left: 1px solid var(--rule); padding-left: 20px; align-self: start; font-size: 14px; line-height: 1.45; font-variant-numeric: tabular-nums; }
  dt { color: var(--secondary); }
  dd { margin: 2px 0 0; font-size: 15px; overflow-wrap: anywhere; }
  @media (max-width: 1023px) {
    article { display: block; }
    .node { left: -29px; }
    .dates { display: flex; flex-wrap: wrap; gap: 12px 24px; border-left: 0; padding-left: 0; margin-top: 16px; }
    .dates div { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 8px; }
    dd { margin: 0; }
  }
  @media (max-width: 639px) {
    article { padding-left: 0; }
    .node { left: -30px; top: 8px; }
    .dates { gap: 8px 20px; font-size: 14px; }
    dd { font-size: 14px; }
  }
</style>
