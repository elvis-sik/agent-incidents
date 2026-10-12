<script lang="ts">
  import PageMeta from '$lib/components/PageMeta.svelte';
</script>

<PageMeta title="Roadmap" description="Plans for host histories, URL checks, an evidence map and access to the published data." />

<main id="main-content" class="document roadmap" tabindex="-1">
  <h1 id="page-title" tabindex="-1">Roadmap</h1>
  <p class="lead">The next step is to help people investigate new findings: which websites have appeared before, which URLs are already known, and what connects them. The evidence needs more review before we open these tools to everyone.</p>

  <section aria-labelledby="available">
    <h2 id="available">Available now</h2>
    <ul class="open-list">
      <li><h3>Incident and reporting timelines</h3><p>Follow cases by the date of the action or the report. Filter by provider and read the sources linked from each entry.</p></li>
      <li><h3>Methodology and corrections</h3><p>Read <a href="/about/#methodology">how cases are chosen</a>, or <a href="/submit/">send a correction or missing source</a>.</p></li>
    </ul>
  </section>

  <section aria-labelledby="next">
    <h2 id="next">Being considered</h2>
    <ul class="open-list">
      <li><h3>Host histories</h3><p>See which websites and services appear in a case, how agents used them and where that use is documented.</p></li>
      <li><h3>URL checks</h3><p>Look up a URL, or submit a batch, to see whether it is already in the collection. Results would distinguish a matching URL from another link on the same website. Agents visiting the site could run these checks through browser WebMCP.</p></li>
      <li><h3>Evidence map</h3><p>Explore connections between cases, websites and individual URLs. Each connection would show its evidence and whether it is documented, reported or inferred.</p></li>
      <li><h3>Change history and data access</h3><p>See what changed when an entry is corrected or expanded. Downloads and a rate-limited API would let others work with the published records.</p></li>
    </ul>
  </section>

  <p class="closing">There are no release dates yet.</p>
</main>

<style>
  .roadmap .open-list { margin-top: 16px; }
  .roadmap .open-list > li { padding: 20px 0; }
  .roadmap .open-list h3 { margin: 0 0 4px; font-size: 19px; }
  .roadmap .closing { margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--rule); color: var(--secondary); }
</style>
