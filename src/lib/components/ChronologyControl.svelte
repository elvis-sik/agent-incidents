<script lang="ts">
  import type { Mode } from '$lib/timeline';

  let { mode, disabled = false, onchange }: {
    mode: Mode;
    disabled?: boolean;
    onchange: (mode: Mode) => void;
  } = $props();
</script>

<fieldset disabled={disabled}>
  <legend class="sr-only">Chronology</legend>
  <div class="segments">
    {#each [{ value: 'incident', label: 'Incident date', text: 'Incidents' }, { value: 'reported', label: 'Reporting date', text: 'Reports' }] as option}
      <label class:active={mode === option.value}>
        <input
          type="radio"
          name="chronology"
          aria-label={option.label}
          value={option.value}
          checked={mode === option.value}
          onchange={() => onchange(option.value as Mode)}
        />
        <span>{option.text}</span>
      </label>
    {/each}
  </div>
</fieldset>

<style>
  fieldset { margin: 0; padding: 0; border: 0; min-width: 0; }
  .segments { display: flex; gap: 24px; }
  label { position: relative; cursor: pointer; }
  input { position: absolute; opacity: 0; inset: 0; width: 100%; height: 100%; margin: 0; cursor: pointer; }
  span { display: flex; align-items: center; min-height: 48px; padding: 12px 0; border-bottom: 2px solid transparent; color: var(--secondary); font-size: 16px; font-weight: 550; }
  label.active span { border-bottom-color: var(--ink); color: var(--ink); }
  input:focus-visible + span { outline: 2px solid var(--ink); outline-offset: 4px; border-radius: 2px; }
  fieldset:disabled label, fieldset:disabled input { cursor: not-allowed; }
  @media (hover: hover) and (pointer: fine) { label:hover span { color: var(--ink); } }
  @media (max-width: 639px) { .segments { gap: 20px; } span { font-size: 15px; } }
</style>
