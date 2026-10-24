Round delivered and pushed to `loop-bench/93`. The branch is not ahead of its upstream, and `origin/main` was already an ancestor, so the merge produced nothing new.

**What I did (one red-green-refactor round, facet "sum each token field"):**
- **Red:** added `sums the usage of every provider call in a turn that ran a tool` to `src/orchestration/chatOrchestrator.test.ts`. It failed for the right reason: the hook got `{6, 2, 8}`, the last round alone, instead of `{10, 3, 13}`.
- **Green:** added `addUsage` to `src/orchestration/orchestratorHelpers.ts`. It sums only the rounds that report usage and returns `undefined` when none did. `chatOrchestrator.ts` now accumulates `totalUsage` across rounds in place of `lastUsage`.
- **Refactor:** nothing needed beyond the formatter.
- **Traceability:** the test sits after every existing `chatOrchestrator.test.ts#L` anchor except one. That anchor, in `specs/hal-engine-tool-input-validation/spec.md`, moved from L550 to L575, and I re-anchored it by hand. There is no `reanchor.mjs` in this repo.
- **dod.md:** ticked the summing facet and the no-tool regression guard.

**Tests run here:** only my new test and the two existing usage tests in that file, selected by name. The acceptance file was not run. I did not run lint, typecheck, build, or the full suite. CI judges the push.

**Red and regression counts:** one red test written and turned green. No regressions were seen in the three tests I ran. I did not run the rest of the suite, including `toolBudget.test.ts`, which also reads the hook's usage.

**Not done, still open facets:**
- Name the total-usage contract and make the hook's public type say it is a sum. dod line 3 still describes the old `lastUsage` local.
- Update `specs/hal-engine-config-hooks/spec.md` and the CHANGELOG. The CHANGELOG entry must mark this as a MINOR bump for existing consumers.

**Other notes:**
- The `lore` MCP server failed to connect, so I could not run `lore-query-trace` before editing and could not use `lore_get_ci_failures`. The round brief did not exist, so there was no CI verdict to act on.
- Bash calls that mention the test runner are blocked by a guard hook unless they name the test file, so I ran jest as `node --experimental-vm-modules node_modules/jest/bin/jest.js <file> -t <name>`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}