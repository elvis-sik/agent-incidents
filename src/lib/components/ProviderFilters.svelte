<script lang="ts">
  import type { Provider } from '$lib/content/schema';

  let { providers, evaluatorOnlyIds, selected, disabled = false, ontoggle, onreset }: {
    providers: Provider[];
    evaluatorOnlyIds: string[];
    selected: string[];
    disabled?: boolean;
    ontoggle: (id: string) => void;
    onreset: () => void;
  } = $props();
</script>

<div class="providers" role="group" aria-label="Filter by provider or evaluator">
  <button type="button" class:active={selected.length === 0} aria-pressed={selected.length === 0} {disabled} onclick={onreset} aria-label="All providers and evaluators">All</button>
  {#each providers as provider (provider.id)}
    <button type="button" class:active={selected.includes(provider.id)} aria-pressed={selected.includes(provider.id)} {disabled} onclick={() => ontoggle(provider.id)}>
      <span class="check" class:checked={selected.includes(provider.id)} aria-hidden="true">✓</span>
      {#if provider.logoPath}<img src={provider.logoPath} alt="" width="20" height="20" />{/if}
      <span>{provider.name}{evaluatorOnlyIds.includes(provider.id) ? ' (evaluator)' : ''}</span>
    </button>
  {/each}
</div>

<style>
  .providers { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; min-width: 0; }
  button { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 44px; min-width: 44px; max-width: 100%; border: 1px solid transparent; border-radius: 5px; background: transparent; color: var(--secondary); padding: 10px 12px; font-size: 14px; font-weight: 550; line-height: 1.3; overflow-wrap: anywhere; }
  @media (hover: hover) and (pointer: fine) {
    button { transition: background 140ms ease, color 140ms ease; }
    button:hover:not(.active):not(:disabled) { background: var(--hover); }
    button:focus-visible { transition: none; }
  }
  @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
    button:active:not(:disabled):not(:focus-visible) { transform: scale(0.98); }
  }
  button.active { color: var(--ink); background: var(--hover); border-color: var(--rule); }
  img { object-fit: contain; flex: 0 0 20px; }
  .check { font-size: 15px; width: 12px; flex: 0 0 12px; visibility: hidden; }
  .check.checked { visibility: visible; }
  @media (max-width: 639px) { button { padding: 10px; } }
</style>
