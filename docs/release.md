# Release operations

## Public website and private research

This repository contains the website, reviewed timeline and labelled test fixtures. It started with a clean snapshot on 12 October 2026, without research Git history. Research records, raw captures and review tools remain in a separate private repository and are not build inputs.

Code is MIT; original text and timeline data are CC BY 4.0. GitHub issues are public. The issue forms accept corrections, new sources and website problems; email remains available for private tips.

## Production targets

| Worker | Hostnames | Behaviour |
| --- | --- | --- |
| `agent-incidents-website` | `agent-incidents.com` | Static website and genuine 404 responses |
| `agent-incidents` | `agent-incidents.jowimo.com`, `www.agent-incidents.com` | HTTP 308 redirect to `https://agent-incidents.com` |

The redirect preserves paths and query strings. Browsers retain fragment identifiers, including timeline anchors. Unknown redirect hostnames return 404. An old path without a corresponding published page remains a 404 on the new domain.

The main `jowimo.com` website links directly to the canonical domain; its source and deployment are maintained separately.

## Deploy

CI validates changes but does not deploy. Use Node 24 and the repository's npm lockfile. Account-specific configurations stay in the ignored files `wrangler.production.jsonc` and `wrangler.redirect.production.jsonc`.

- Website configuration: copy `wrangler.jsonc`, set the deployment account and add `routes: [{ "pattern": "agent-incidents.com", "custom_domain": true }]`.
- Redirect configuration: use `workers/redirect.ts`, Worker name `agent-incidents`, the same account, and the two redirect hostnames as custom domains. Set `workers_dev` and `preview_urls` to false. Do not include static assets or database bindings.

Before deployment, verify the branch, diff, account with `npx wrangler whoami`, and both configurations. Run type checks, worker checks, unit tests, production build and browser tests. Build and browser tests must run sequentially.

```sh
npm run build
npx wrangler deploy --config wrangler.production.jsonc --dry-run
npx wrangler deploy --config wrangler.redirect.production.jsonc --dry-run
npx wrangler deploy --config wrangler.production.jsonc
# Verify the new HTTPS site before changing the old entry point.
npx wrangler deploy --config wrangler.redirect.production.jsonc
```

Verify `/`, `/about/`, `/roadmap/`, `/submit/`, sitemap, canonical metadata and genuine 404s for unpublished routes. Test redirects with paths, encoded query strings and a browser timeline fragment. Confirm the research repository remains private and GitHub contribution links are publicly accessible.

Record the deployed Worker version IDs in the release receipt. For rollback, select the last working version with Wrangler's rollback command after checking its identity; custom-domain assignments are separate and must also be checked. Preserve the old site until the new hostname has passed verification.

## Future database features

The website must not connect to the internal research store. Approved records can later be exported to a separate D1 database with a bounded read-only API. Everything returned by that API is public content. Query limits control usage; they do not make returned records private.

Database schemas and application code may be public while credentials and database contents remain separately controlled. A public build must continue to work with reviewed records or labelled sample data.
