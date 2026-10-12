<script lang="ts">
  import type { Incident, Provider } from '$lib/content/schema';
  import { groupReports, type Order } from '$lib/timeline';
  import ReportEntry from './ReportEntry.svelte';

  let { incidents, providers, order, demo, incidentHref }: {
    incidents: Incident[];
    providers: Provider[];
    order: Order;
    demo: boolean;
    incidentHref: (id: string) => string;
  } = $props();
  let groups = $derived(groupReports(incidents, order));
</script>

<div class="timeline reports">
  {#each groups as group (group.id)}
    <section aria-labelledby={`group-${group.id}`}>
      <div class="date-heading">{#if group.date}<p>Published</p>{/if}<h2 id={`group-${group.id}`} class="group-label">{group.label}</h2></div>
      <ol>
        {#each group.entries as entry (entry.id)}
          <li><ReportEntry {...entry} {providers} {demo} incidentHref={incidentHref(entry.incident.id)} /></li>
        {/each}
      </ol>
    </section>
  {/each}
</div>

<style>
  section { display: grid; grid-template-columns: 136px minmax(0, 1fr); gap: 48px; }
  section + section { margin-top: 40px; padding-top: 32px; border-top: 1px solid var(--rule); }
  .date-heading p { margin: 0 0 4px; color: var(--secondary); font-size: 13px; line-height: 1.5; }
  .group-label { margin: 0; font-size: 18px; line-height: 1.4; font-weight: 600; font-variant-numeric: tabular-nums; }
  ol { list-style: none; padding: 0; margin: 0; position: relative; }
  ol::before { content: ''; position: absolute; left: -32px; top: 8px; bottom: 0; width: 1px; background: var(--edge); }
  li { margin: 0; padding: 0 0 32px; }
  li:last-child { padding-bottom: 0; }
  @media (max-width: 1023px) {
    section { grid-template-columns: 120px minmax(0, 1fr); gap: 40px; }
    ol::before { left: -24px; }
  }
  @media (max-width: 639px) {
    section { display: block; }
    .date-heading { margin-bottom: 20px; }
    .date-heading p { display: inline; margin: 0 8px 0 0; }
    .group-label { display: inline; font-size: 17px; }
    ol { padding-left: 30px; }
    ol::before { left: 5px; }
    li { padding-bottom: 32px; }
    section + section { margin-top: 32px; padding-top: 24px; }
  }
</style>
