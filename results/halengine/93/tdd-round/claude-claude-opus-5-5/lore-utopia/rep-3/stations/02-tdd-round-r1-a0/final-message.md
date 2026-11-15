I fixed the three things CI flagged on `d86575b` (two eslint errors and the missing changelog entry), committed, and pushed. The branch was already up to date with `origin/main`, and `git status` shows nothing left unpushed.

- **eslint `re-lint/max-expects`** (`src/orchestration/orchestratorHelpers.test.ts:33`): I split the `addUsage` test, which had two `expect` calls, into two tests with one each:
  - `sums every token field over the rounds that reported usage` (line 33)
  - `stays undefined when no round reported usage` (line 43)

  The only test I ran is this file, and its 6 tests pass. I did not run the acceptance tests, lint, typecheck or build.
- **eslint `re-lint/require-spec-link`** (acceptance test at line 67): the statement about rounds that report no usage in `specs/hal-engine-config-hooks/spec.md` now links to that acceptance test at `#L67`, plus the two split helper tests at `#L33` and `#L43`. This repo has no `scripts/spec-links/reanchor.mjs`, so I checked the line numbers by hand. The acceptance test itself is unedited.
- **changelog check**: I added a `### Changed` entry under `[Unreleased]`. It says `afterModelResponse` now gets usage summed over every provider call in the turn. Its migration note says a turn with no tool calls reports the same as before, while a tool-using turn will now record a larger, correct number.

In `.lore/dod.md` I ticked the facet "Update the hooks spec and CHANGELOG". The red tests were none of my own and none were regressions: all the findings were lint and changelog checks, not failing tests.

**Unrelated issue, left alone:** the `*.test.ts` files fail under a plain `npx jest`. They only run through `node --experimental-vm-modules`, which is how `npm test` runs them.

The next facet is to make the hook's usage type say outright that it is a turn total. The CLAUDE.md `OrchestratorHooks` block is generated from that declaration, so it needs regenerating after the type changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior (plus CI lint fixes: spec link for acceptance test, one-expect helper tests)","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}