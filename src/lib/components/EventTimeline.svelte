<script lang="ts">
  import type { Incident } from '$lib/content/schema';
  import { formatIncidentDate, groupEvents } from '$lib/timeline';

  let { incident }: { incident: Incident } = $props();
  let groups = $derived(groupEvents(incident.events));
</script>

{#if incident.events.length}
  <details class="event-timeline">
    <summary>
      <svg class="chevron" aria-hidden="true" viewBox="0 0 16 16" width="16" height="16"><path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
      <span>Incident timeline</span>
      <span class="event-count">{incident.events.length} {incident.events.length === 1 ? 'event' : 'events'}</span>
    </summary>
    <p class="sequence-note">Ordered by earliest known date. Original date precision is preserved.</p>
    {#each groups as group (group.id)}
      <div class="event-group">
        {#if group.label}<p class="event-group-label" id={`events-${incident.id}-${group.id}`}>{group.label}</p>{/if}
        <ol aria-label={group.label ?? 'Events, earliest first'}>
          {#each group.events as event (event.id)}
            <li id={`event--${incident.id}--${event.id}`} class:uncertain={event.date.kind !== 'exact'}>
              <p class="event-date">{formatIncidentDate(event.date)}</p>
              <h4><a href={`#event--${incident.id}--${event.id}`}>{event.title}</a></h4>
              <p class="event-summary">{event.summary}</p>
              <ul class="event-citations" aria-label="Event sources">
                {#each event.sourceIds as sourceId}
                  {@const sourceIndex = incident.sources.findIndex((source) => source.id === sourceId)}
                  <li><a href={`#source--${incident.id}--${sourceId}`}>Source {sourceIndex + 1}<span class="sr-only"> — {incident.sources[sourceIndex].label}</span></a></li>
                {/each}
              </ul>
            </li>
          {/each}
        </ol>
      </div>
    {/each}
  </details>
{/if}

<style>
  details { margin-top: 20px; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
  summary { display: flex; align-items: center; gap: 8px; min-height: 48px; padding: 10px 0; list-style: none; cursor: pointer; font-size: 15px; font-weight: 600; }
  summary::-webkit-details-marker { display: none; }
  .chevron { flex: 0 0 16px; }
  details[open] .chevron { transform: rotate(90deg); }
  .event-count { margin-left: auto; color: var(--secondary); font-size: 13px; font-weight: 400; white-space: nowrap; }
  .sequence-note { margin: 0 0 20px 24px; color: var(--secondary); font-size: 13px; line-height: 1.5; }
  .event-group { padding-left: 24px; }
  .event-group-label { margin: 24px 0 16px; font-size: 14px; font-weight: 600; }
  ol { margin: 0; padding: 0 0 0 20px; list-style: none; border-left: 1px solid var(--rule); }
  ol > li { position: relative; margin: 0; padding: 0 0 24px; scroll-margin-top: 24px; }
  ol > li::before { content: ''; width: 7px; height: 7px; border: 1px solid var(--ink); background: var(--ink); border-radius: 50%; position: absolute; left: -24px; top: 6px; }
  ol > li.uncertain::before { background: var(--paper); }
  ol > li:target h4 a { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 4px; }
  .event-date { margin: 0; color: var(--secondary); font-size: 13px; line-height: 1.5; font-variant-numeric: tabular-nums; }
  h4 { margin: 5px 0 0; font-size: 16px; font-weight: 600; line-height: 1.4; }
  h4 a { text-decoration: none; }
  .event-summary { margin: 5px 0 0; font-size: 15px; line-height: 1.5; }
  .event-citations { display: flex; flex-wrap: wrap; gap: 4px 16px; margin: 8px 0 0; padding: 0; list-style: none; font-size: 13px; line-height: 1.5; }
  .event-citations a { display: inline-block; padding: 3px 0; }
  @media (hover: hover) and (pointer: fine) {
    summary:hover { color: var(--secondary); }
    h4 a:hover { text-decoration: underline; }
  }
  @media (max-width: 639px) {
    .event-group { padding-left: 8px; }
    .sequence-note { margin-left: 0; }
  }
</style>
