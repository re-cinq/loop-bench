I fixed the four eslint findings that CI named on `loop-bench/93`, pushed the commit, and the branch is level with its upstream. The new head is `8720762`. CI has not judged it yet.

**What was red:** `src/orchestration/orchestratorHelpers.test.ts` had three tests without a spec link (lines 29, 35, 41) and one test with two `expect` calls (line 35).

**What I changed:**
- **Split the two-expect test.** The `returns the defined side…` test is now two tests: `returns the second operand when the first is undefined` (line 35) and `returns the first operand when the second is undefined` (line 40). The assertions are unchanged.
- **Linked each test from its own spec bullet.** I added four bullets after the usage bullet in `specs/hal-engine-config-hooks/spec.md`, one per `accumulateUsage` test, each with a trailing `validated by` link to its test line (29, 35, 40, 45). AGENTS.md asks for one link per list item, so I did not stack links onto the existing bullet.

**Checks:**
- Prettier was run on both changed files and left them unchanged.
- `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/orchestratorHelpers.test.ts` passed 8 of 8. That is the repo's own test command.
- I did not run eslint, typecheck or the build here, per the pod rules.

**Gaps:**
- The lore MCP server failed to connect (`CONNECTION_CLOSED`), so I could not run `lore-query-trace` or `lore_get_ci_failures`. I worked from the verdict in the round brief, which was complete. The branch had not moved since CI's judged sha.
- The `re-lint/require-spec-link` rule only needs a link whose line falls inside each test's span. I used the `it` line for each. I did not run the rule itself, since that is a lint run.

**Merge:** `origin/main` was already contained in the branch, so the merge had nothing to do and produced no commit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint require-spec-link (3) and max-expects in orchestratorHelpers.test.ts: split the two-expect test and added one spec link per accumulateUsage test"}}