<script lang="ts">
  let scrollY = $state(0);

  function backToTop() {
    document.getElementById('page-title')?.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
  }
</script>

<svelte:window bind:scrollY />

{#if scrollY > 600}
  <button class="back-to-top" type="button" aria-label="Back to top" title="Back to top" onclick={backToTop}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 19V5m-6 6 6-6 6 6" />
    </svg>
  </button>
{/if}

<style>
  .back-to-top {
    position: fixed;
    right: max(16px, env(safe-area-inset-right));
    bottom: max(16px, env(safe-area-inset-bottom));
    z-index: 10;
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    padding: 0;
    border: 1px solid var(--edge);
    border-radius: 50%;
    background: var(--paper);
    color: var(--ink);
  }
  @media (hover: hover) {
    .back-to-top:hover { background: var(--hover); border-color: var(--ink); }
  }
</style>
