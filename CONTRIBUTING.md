# Contributing

Corrections and additional sources are welcome. You do not need to write code: use the issue form that matches your suggestion.

## Correct an entry

Link to the entry, identify the exact claim or date, and explain what should change. Include the original source and, where useful, a section, page number or short quotation. Say when the evidence is incomplete or conflicts with another source.

## Suggest a case or source

Describe what the agent did and what supports that account. Include the originating context when known: deployment, internal use, training or evaluation. Keep the action date separate from publication dates; “unknown” is useful when the source gives no date.

Distinguish observation, the source's claim and your interpretation. An organisation or hostname appearing in a source does not by itself establish that an agent accessed it. Additional reporting about an existing case usually belongs in that entry rather than a new incident.

The [collection decisions](docs/collection.md) explain current scope and grouping. We may request evidence, merge duplicate suggestions, or decline a case that falls outside that scope. An issue is a proposal, not a published finding.

## Private tips

GitHub issues are public. Do not post confidential material, credentials or personal data in them. Email [agent-incidents@jowimo.com](mailto:agent-incidents@jowimo.com) for a tip that should remain outside GitHub. We may ask for a public source before adding it to the timeline.

## Make a pull request

1. Create a branch and keep the change focused on one correction or feature.
2. For a new record, start from [the incident template](docs/examples/incident.json) and follow the [data contract](docs/data-contract.md). Replace all fictional values; the filename must match the incident ID.
3. Preserve source IDs and timeline anchors when editing an existing entry. Update `content/site.json` to reflect the editorial change date.
4. Run `npm run check`, `npm run check:worker`, `npm test` and `npm run build`. Run the relevant browser tests and inspect the page when changing the interface.
5. Explain the change, link its evidence and related issue, and state what you checked.

Maintainers review evidence and wording before merging. Merging and deploying are separate steps. CI has no research credentials or deployment access.

## Contribution licences

Contribute code under MIT and your original editorial text, documentation and timeline data under CC BY 4.0, matching [LICENSING.md](LICENSING.md). Identify third-party material and link to its source; do not submit whole articles or raw research dumps as timeline content.
