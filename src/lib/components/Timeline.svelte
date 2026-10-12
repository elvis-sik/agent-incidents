<script lang="ts">
  import type { Incident, Provider } from '$lib/content/schema';
  import { groupIncidents, type Order } from '$lib/timeline';
  import IncidentEntry from './IncidentEntry.svelte';

  let { incidents, providers, order, demo }: {
    incidents: Incident[];
    providers: Provider[];
    order: Order;
    demo: boolean;
  } = $props();
  let groups = $derived(groupIncidents(incidents, order));
</script>

<div class="timeline">
  {#each groups as group (group.id)}
    {#if group.incidents.length > 0}
      <section aria-labelledby={`group-${group.id}`}>
        {#if group.label}
          <h2 id={`group-${group.id}`} class="group-label"><span>{group.label}</span></h2>
        {:else}
          <h2 id={`group-${group.id}`} class="sr-only">By incident date</h2>
        {/if}
        <ol>
          {#each group.incidents as incident (incident.id)}
            <li><IncidentEntry {incident} {providers} {demo} /></li>
          {/each}
        </ol>
      </section>
    {/if}
  {/each}
</div>

<style>
  section + section { margin-top: 48px; }
  ol { list-style: none; padding: 0; margin: 0; position: relative; }
  ol::before { content: ''; position: absolute; left: 152px; top: 8px; bottom: 0; width: 1px; background: var(--edge); }
  li { margin: 0; padding: 0 0 48px; }
  li:last-child { padding-bottom: 0; }
  .group-label { display: flex; align-items: center; gap: 24px; margin: 0 0 32px; font-size: 20px; line-height: 1.3; font-weight: 650; letter-spacing: -0.02em; }
  .group-label::after { content: ''; height: 1px; background: var(--rule); flex: 1; }
  @media (max-width: 1023px) { ol::before { left: 136px; } }
  @media (max-width: 639px) {
    ol::before { left: 5px; }
    li { padding-bottom: 32px; }
    section + section { margin-top: 36px; }
    .group-label { gap: 16px; font-size: 18px; margin-bottom: 28px; }
  }
</style>
