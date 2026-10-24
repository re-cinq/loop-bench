The acceptance tests are committed and pushed, and both fail for the reason the ticket names: the hook receives only the final round's usage.

**Strategy: `direct`.** `createChatOrchestrator` and the `afterModelResponse` hook already exist, and a scripted provider can report known usage per round without a mock library.

**Tests:** `src/orchestration/usageAcrossRounds.acceptance.test.ts`, two tests. Both use a scripted provider and run through `processMessage`.
- **Two tool rounds, summed:** three provider calls report 120, 340 and 560 tokens; the hook must receive 900 in / 120 out / 1020 total.
- **Rounds that report nothing:** a silent round neither erases nor poisons the total (150 / 25 / 175 from the two that reported), and a turn where no round reports hands the hook `undefined`.

I also listed the existing test `receives collected response text and usage` in `chatOrchestrator.test.ts` as a guard that must stay unedited. It passes today.

**Red bar, run here with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/usageAcrossRounds.acceptance.test.ts`:**
```
  ● usage across tool rounds › reports the summed usage of every provider call in a turn that ran two tool rounds
    - Expected  - 3
    + Received  + 3
    -   "inputTokens": 900,
    -   "outputTokens": 120,
    -   "totalTokens": 1020,
    +   "inputTokens": 500,
    +   "outputTokens": 60,
    +   "totalTokens": 560,

  ● usage across tool rounds › leaves out a round that reports no usage, and reports nothing when no round reports
    - Expected  - 3
    + Received  + 3
        "partial": Object {
    -     "inputTokens": 150,
    -     "outputTokens": 25,
    -     "totalTokens": 175,
    +     "inputTokens": 50,
    +     "outputTokens": 5,
    +     "totalTokens": 55,
        },
Tests:       2 failed, 2 total
```
The `none: undefined` branch already passes, as expected. The failure is only the sum.

**Decisions I made, for you to redirect:**
- **Shape:** the tests assume the first shape the ticket weighs, one `usage` argument carrying the sum. The "pass both" shape is not chosen. If an implementer picks it, these assertions move with the signature.
- **Criteria with no test:** the type-clarity criterion is a compile-time property, so it is left to review and `npm run typecheck`. The build, lint, format and suite gates are CI's, and the spec and CHANGELOG edits are implementation work.
- **Spec traceability:** I did not add a `validated by` link. The spec line being replaced carries none, and the new behaviour does not exist in the spec yet.

**Not run here:** the lore MCP server failed to connect, so I made no `lore_*` calls. I did not run lint, typecheck, build or the full suite, as the ticket asks.

**Branch:** `.lore/dod.md` and the test file are committed as `a1830ca` and pushed. The branch contains `origin/main` and is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}