<script lang="ts">
  import type { Incident, Provider } from '$lib/content/schema';

  let { incident, providers, compact = false }: {
    incident: Incident;
    providers: Provider[];
    compact?: boolean;
  } = $props();
  let evaluators = $derived(incident.evaluatorIds.map((id) => providers.find((provider) => provider.id === id)!));
  let modelProviders = $derived(incident.providerIds.map((id) => providers.find((provider) => provider.id === id)!));
</script>

<div class="attribution" class:compact>
  {#if evaluators.length}
    <div class="attribution-row evaluators">
      <span class="role-label">{evaluators.length === 1 ? 'Evaluator' : 'Evaluators'}:</span>
      {#each evaluators as evaluator (evaluator.id)}
        <span class="organisation">{evaluator.name}</span>
      {/each}
    </div>
  {/if}
  <div class="attribution-row providers">
    {#if evaluators.length || compact}
      <span class="role-label">{evaluators.length ? modelProviders.length === 1 ? 'Model provider' : 'Model providers' : modelProviders.length === 1 ? 'Provider' : 'Providers'}:</span>
    {/if}
    {#each modelProviders as provider (provider.id)}
      <span class="organisation">
        {#if provider.logoPath}<img src={provider.logoPath} alt="" width={compact ? 18 : 24} height={compact ? 18 : 24} />{/if}
        <span>{evaluators.length && provider.id === 'unknown' ? 'Unknown' : provider.name}</span>
      </span>
    {/each}
  </div>
</div>

<style>
  .attribution { display: flex; flex-direction: column; gap: 6px; }
  .attribution-row { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 12px; line-height: 1.3; }
  .role-label { color: var(--secondary); font-size: 14px; }
  .organisation { display: inline-flex; gap: 8px; align-items: center; min-height: 24px; font-size: 18px; font-weight: 600; }
  img { flex-shrink: 0; object-fit: contain; }
  .compact { margin-top: 16px; }
  .compact .attribution-row { line-height: 1.5; }
  .compact .organisation { min-height: 18px; gap: 6px; font-size: 14px; }
  @media (max-width: 639px) { .organisation { font-size: 16px; } }
</style>
