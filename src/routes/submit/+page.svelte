<script lang="ts">
  import PageMeta from '$lib/components/PageMeta.svelte';
  import { site } from '$lib/site';
</script>

<PageMeta title="Send a tip or correction" description="Share a source for a missing case or a correction to an existing timeline entry." />

<main id="main-content" class="document" tabindex="-1">
  <h1 id="page-title" tabindex="-1">Send a tip or correction</h1>
  <p class="lead">Send us a missing case, a better source or a correction. Include the original reference and a short note explaining what it shows.</p>
  <p class="contact"><a href={`mailto:${site.contactEmail}?subject=Agent%20incidents%20tip`}>{site.contactEmail}</a></p>

  <h2>What helps</h2>
  <ol>
    <li><strong>Source:</strong> the original public URL or document, and who published it.</li>
    <li><strong>Action and dates:</strong> what the agent did, where it was operating, when it happened and when it was reported. Say which dates are uncertain.</li>
    <li><strong>For a correction:</strong> a link to the timeline entry and the exact claim or date to revisit.</li>
  </ol>
  <p>Please separate what the source shows from what you infer. Do not send credentials or private personal data.</p>
  <p>We review tips and corrections before updating the timeline.</p>
</main>

<style>
  .contact { font-size: 20px; font-weight: 600; overflow-wrap: anywhere; }
  .contact a { text-underline-offset: 4px; }
</style>
