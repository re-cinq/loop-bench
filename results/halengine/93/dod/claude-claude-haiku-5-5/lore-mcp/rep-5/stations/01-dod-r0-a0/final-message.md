The acceptance tests are committed and pushed to `loop-bench/93` (commit `e566bc1`). The branch is level with `origin/main` and up to date with its upstream, so no merge was needed.

**Strategy: `direct`.** The seam already exists: `createChatOrchestrator` takes a scripted provider and the `afterModelResponse` hook, the same way `toolBudget.test.ts` drives it.

**Tests** in `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`:
1. **reports the usage of every provider call in a turn that ran two tool rounds.** Three provider calls report 100/20/120, 300/40/340 and 500/60/560. The hook should receive the sum, 900/120/1020.
2. **counts the rounds that reported and leaves the total undefined only when no round reported.** A mixed turn should sum to 600/80/680. A turn where nothing reports should hand the hook `undefined`.

**Red bar, run with `NODE_OPTIONS=--experimental-vm-modules node node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.usage.acceptance.test.ts`:**
```
  ● afterModelResponse usage across tool rounds › reports the usage of every provider call in a turn that ran two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 900,
    -   "outputTokens": 120,
    -   "totalTokens": 1020,
    +   "inputTokens": 500,
    +   "outputTokens": 60,
    +   "totalTokens": 560,
      }

  ● afterModelResponse usage across tool rounds › counts the rounds that reported and leaves the total undefined only when no round reported

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "mixed": Object {
    -     "inputTokens": 600,
    -     "outputTokens": 80,
    -     "totalTokens": 680,
    +     "inputTokens": 500,
    +     "outputTokens": 60,
    +     "totalTokens": 560,
        },
        "silent": undefined,
      }

Tests:       2 failed, 2 total
```
Both fail because the hook receives only the final call's usage, which is the claim the ticket makes. The silent-turn half of test 2 already passes; it guards the "nothing reported" case.

**Decision recorded in `.lore/dod.md`:** the total is the sum, passed in the existing third argument of `afterModelResponse`. That keeps the "pass both" shape optional rather than required. The existing no-tools test `receives collected response text and usage` and the multi-round test `keeps the usage an earlier round reported…` are listed as regression guards that pass today and stay unedited.

**Not covered by a test, and why:**
- The ticket's criterion that the hook's type says it is a sum. That is a type-level property, so it belongs with the typecheck step. It is listed as a facet.
- The spec and CHANGELOG edits. They are doc work for the implementation round, and I did not edit the spec's Status row.
- I did not add the spec's `validated by` link. The statement it would link to does not exist until the behaviour changes.

**Things I could not do here:**
- **Lore is unavailable.** The `lore` MCP server failed to connect, so I could not query lore context or write memory. I did not look for another way to reach it.
- **The DoD file names Jest, not Vitest.** `.lore/test-commands.yml` describes the Jest suite, and the tests use Jest's globals. The test file is not a Vitest file.
- **The red bar is shown here, not in CI.** Both tests ran in this pod. CI runs them through the Jest suite as part of the "Test" step in `.github/workflows/ci.yml`, and the test-command `run` for them is `node scripts/lore-run-test.mjs "src/orchestration/chatOrchestrator.usage.acceptance.test.ts::<full test name>"`.
- **I did not run lint or the typechecker.** Prettier was applied to both changed files.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}