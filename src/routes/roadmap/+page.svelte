<script lang="ts">
  import PageMeta from '$lib/components/PageMeta.svelte';
  import { site } from '$lib/site';
</script>

<PageMeta title="Roadmap" description="Plans for host histories, URL checks, connections between cases and access to the published data." />

<main id="main-content" class="document roadmap" tabindex="-1">
  <h1 id="page-title" tabindex="-1">Roadmap</h1>
  <p class="lead">The timeline is the starting point. Here’s what I’d like to add as the collection grows, and what needs to be in place for each step.</p>

  <section aria-labelledby="available">
    <h2 id="available">Available now</h2>
    <ul class="open-list">
      <li><h3>Incident and reporting timelines</h3><p>Follow cases by the date of the action or the report. Filter by provider and read the sources linked from each entry.</p></li>
      <li><h3>Methodology and corrections</h3><p>Read <a href="/about/#methodology">how I choose cases</a>, or <a href="/submit/">send a correction or missing source</a>.</p></li>
    </ul>
  </section>

  <section aria-labelledby="next">
    <h2 id="next">Planned steps</h2>
    <ol class="open-list">
      <li>
        <h3><span aria-hidden="true">1. </span>Host histories</h3>
        <p>Show the websites and services involved in each case and how agents used them.</p>
        <p>Needs: a reviewed host list, with sources for each connection.</p>
      </li>
      <li>
        <h3><span aria-hidden="true">2. </span>URL checks</h3>
        <p>Check a URL or a batch of URLs against known findings. Browser WebMCP would let agents visiting the site run the same checks.</p>
        <p>Needs: consistent URL matching, reviewed records and query limits.</p>
      </li>
      <li>
        <h3><span aria-hidden="true">3. </span>Map the connections</h3>
        <p>Explore how incidents, hosts and individual links relate to each other.</p>
        <p>Needs: evidence for each connection, with inferred relationships labelled.</p>
      </li>
      <li>
        <h3><span aria-hidden="true">4. </span>Change history and data access</h3>
        <p>Follow corrections and additions, download the published records or query them through an API.</p>
        <p>Needs: revision tracking and a documented format for the published data.</p>
      </li>
    </ol>
  </section>

  <p class="closing">Want to help? <a href="/submit/">Suggest a source or improvement</a>, or <a href={site.repositoryUrl}>look through the code on GitHub</a>.</p>
</main>

<style>
  .roadmap .open-list { margin-top: 16px; }
  .roadmap .open-list > li { padding: 20px 0; }
  .roadmap .open-list h3 { margin: 0 0 4px; font-size: 19px; }
  .roadmap .open-list h3 span { margin-right: 0.3em; }
  .roadmap .closing { margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--rule); color: var(--secondary); }
</style>
