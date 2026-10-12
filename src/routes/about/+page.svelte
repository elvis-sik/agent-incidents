<script lang="ts">
  import PageMeta from '$lib/components/PageMeta.svelte';
</script>

<PageMeta title="About and methodology" description="How cases are selected, sources are checked and uncertainty is recorded." />

<main id="main-content" class="document" tabindex="-1">
  <h1 id="page-title" tabindex="-1">About Agent incidents</h1>
  <p class="lead">A collection of public reports about AI agents doing things their users or developers did not intend.</p>

  <h2>Why this exists</h2>
  <p>A case rarely arrives as one complete account. A lab may disclose it, an affected service may publish its own findings, and researchers may uncover more later. This site brings those accounts together.</p>

  <h2 id="methodology">Methodology</h2>
  <p>Each entry starts with a public source we have read. It must describe an agent exceeding its task, breaching a restriction or causing an unexpected effect. Cases can come from live use, internal tasks, training or evaluations. Each is labelled to make the setting clear.</p>
  <p>One entry can cover several related actions or model runs. Its event list shows the steps described in the sources. The total counts entries; it does not measure how often agents fail or how many people were affected.</p>

  <h2>Sources and uncertainty</h2>
  <p>We start with lab disclosures, accounts from affected organisations and original investigations. News reports are included when they add information. Several articles repeating the same account do not provide independent confirmation.</p>
  <p>Disputed claims stay attributed to whoever made them. Summaries distinguish what a source documents from what its authors infer. Provider names identify the model's developer or the agent's operator; they do not assign responsibility. Similar tasks or shared hostnames need more evidence before we can link two cases.</p>

  <h2>Reading the dates</h2>
  <p>The <a href="/">Incidents</a> view orders cases by when the actions happened. The Reports view uses publication dates, so a case can appear more than once. If a source gives only a month or a date range, that is what we show. Undated cases stay undated.</p>

  <h2>Corrections and additions</h2>
  <p>If we missed a source or got a date or attribution wrong, <a href="/submit/">send a correction</a> with the original reference. New cases are welcome too. We review submissions before updating entries. See the <a href="/roadmap/">roadmap</a> for planned additions.</p>
</main>
