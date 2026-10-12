# Release boundary

## Current state

This repository was prepared as a clean website snapshot on 12 October 2026. It remains private for review. It has no inherited research Git history, raw captures, host/URL catalogue, research database exports or private-review tools. Its content is the reviewed timeline plus labelled fictional test fixtures.

The existing subdomain release is unchanged. Creating or pushing this repository does not deploy it, activate the standalone domain, or configure a redirect.

## Before opening the repository

Review the complete tracked file list and Git history, issue forms and contribution instructions. Confirm that the code/content licence split is clear and that CI passes without private data or credentials. Making the repository public is an explicit maintainer action.

The two editorial issue forms collect corrections and proposed evidence. A third collects website bugs. Their submissions remain proposals until reviewed and merged. Private tips stay outside public issues and build artefacts.

## Before deploying

Build and review the real collection locally. Supply a separate, ignored production Wrangler configuration with the intended account, Worker name and domain routes. Verify those targets before an authorised manual deployment. CI must remain check-only unless a deployment workflow is deliberately approved.

Verify the standalone domain before switching the old subdomain to a redirect. Decide how old deep links should resolve; the first release has only `/`, `/about/`, `/roadmap/` and `/submit/`, plus sitemap and robots metadata.

## Future database features

The website must not connect to the internal research store. Approved records can later be exported to a separate D1 database with a bounded read-only API. Everything returned by that API is public content. Query limits control usage; they do not make returned records private.

Database schemas and application code may be public while credentials and database contents remain separately controlled. A public build must continue to work with reviewed records or labelled sample data.
