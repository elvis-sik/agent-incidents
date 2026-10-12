# Agent incidents website

Read README.md, CONTRIBUTING.md and docs/data-contract.md before changes. This repository is private pending review, but every committed file must be suitable for the future public repository.

- Keep the site independently runnable from its reviewed JSON and labelled fixtures. Do not add dependencies on private research files, credentials or databases.
- Use SvelteKit, TypeScript, static prerendering and plain scoped CSS. Use the declared npm version and lockfile.
- Keep timeline, About/methodology, Roadmap and tips as the current surface. Search, hosts, WebMCP and database queries remain future work.
- Preserve incident, event and publication dates separately. Do not strengthen claims, conflate controlled evaluations with deployments, or turn inference into observation.
- Keep source titles, IDs, URLs and evidence notes faithful. Invalid records fail clearly; never silently omit them.
- Write authored prose in British English. Preserve the existing editorial layout and readable source links.
- Run checks appropriate to the change. For data/loader changes, run type checks, unit tests and a production build. For UI changes, inspect the rendered page and relevant browser tests.
- Never place private notes, raw research, candidate datasets, secrets or database exports here, including in fixtures, Git history or CI artefacts.
- Preserve unrelated changes. Verify the repository, branch, diff and target before remote operations. A private push does not authorise changing visibility, deploying, or activating domain redirects.
