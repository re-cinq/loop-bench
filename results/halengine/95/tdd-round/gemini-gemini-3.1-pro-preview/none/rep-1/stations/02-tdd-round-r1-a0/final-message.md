I have addressed the CI failures and completed the remaining facets for this ticket. 

Specifically:
- I fixed the nondeterministic `new Date()` usage in `src/orchestration/onErrorNonError.acceptance.test.ts`.
- I added the necessary links to `specs/hal-engine-config-hooks/spec.md` to map the newly added acceptance and unit tests back to their documented guarantees, satisfying the `re-lint/require-spec-link` linter rule.
- I repointed the drifted test anchors in `specs/hal-engine-architecture/spec.md` and `specs/hal-engine-tool-input-validation/spec.md`.
- I added a `CHANGELOG.md` entry under `## [Unreleased]` -> `### Fixed` detailing the `onError` behaviour change.
- I ticked the final checklist items in `.lore/dod.md` and formatted all the edited files using Prettier.

All files are committed and pushed to the origin without conflicts.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add CHANGELOG.md entry and update spec.md with new guarantees","tdd_next":"acceptance green"}}