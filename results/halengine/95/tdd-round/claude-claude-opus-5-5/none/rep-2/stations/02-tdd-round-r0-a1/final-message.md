I added the CHANGELOG entry, which was the last unticked facet in `.lore/dod.md`. It's committed and pushed, and the branch is level with `origin/loop-bench/95`. Merging `origin/main` changed nothing.

- **What changed:** a new bullet under `## [Unreleased]` → `### Fixed` in `CHANGELOG.md`. It says that `onError` now fires for every rejection. A value that isn't an `Error` is wrapped in one, with the original as its `cause`. A real `Error` passes through as the same instance, the hook's signature is unchanged, and the caller still gets the original rejection. The migration note tells hook authors to read `error.cause` if they want the raw value. I ran prettier over the two files, and the facet is ticked.
- **No red phase this round:** the facet is prose only. The rules forbid a test that checks the repo's own text, so I wrote no test and ran none.
- **Other acceptance items:** the code fix in `src/orchestration/chatOrchestrator.ts` and the new guarantee in `specs/hal-engine-config-hooks/spec.md` already landed last round. That spec line links to both acceptance tests and to the `undefined` test.
- **Red tests:** there is no round brief or CI verdict yet for the previous push, so none are known: 0 mine, 0 regressions. CI will judge this push.
- **Smells:** none noticed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add a CHANGELOG.md entry under [Unreleased] describing the onError behaviour change for existing consumers","tdd_next":"acceptance green"}}