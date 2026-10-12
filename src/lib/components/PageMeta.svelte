<script lang="ts">
  import { page } from '$app/state';
  import { canonicalUrl, site } from '$lib/site';
  let { title, description = site.description }: { title: string; description?: string } = $props();
  let canonical = $derived(canonicalUrl(page.url.pathname));
</script>
<svelte:head>
  <title>{title === site.name ? title : `${title} · ${site.name}`}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={site.name} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
</svelte:head>
