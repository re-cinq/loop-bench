Two acceptance tests are committed and pushed to `loop-bench/93`, and both fail for the reason the ticket states. The branch is up to date with `origin/main` and not ahead of its upstream.

**Triage: `direct`.** `createChatOrchestrator` and `processMessage` are a real seam, and a scripted provider can report known usage per round. The tests observe the hook's third argument through that entry point.

**Tests** (`src/orchestration/usageAcrossRounds.acceptance.test.ts`):
1. **reports the summed usage of every provider call when a turn runs two tool rounds.** Three provider calls report 100/300/500 input tokens. The hook should receive 900 input, 120 output, 1020 total.
2. **leaves a round that reports no usage out of the total, and reports nothing when no round does.** A silent middle round should give the sum of the reporting rounds (30/15/45). A turn where nothing reports should still give `undefined`.

**Red bar.** I ran the file with Jest, not CI's `npm run test:coverage` (the `Verify` job's "Test (with coverage floor)" step). The failures:

```
● afterModelResponse usage across tool rounds › reports the summed usage of every provider call when a turn runs two tool rounds
    - Expected
    + Received
    -   "inputTokens": 900,
    -   "outputTokens": 120,
    -   "totalTokens": 1020,
    +   "inputTokens": 500,
    +   "outputTokens": 60,
    +   "totalTokens": 560,

● afterModelResponse usage across tool rounds › leaves a round that reports no usage out of the total, and reports nothing when no round does
    - Expected
    + Received
    -   "inputTokens": 30,
    -   "outputTokens": 15,
    -   "totalTokens": 45,
    +   "inputTokens": 20,
    +   "outputTokens": 10,
    +   "totalTokens": 30,
```

Both show the hook receiving only the final provider call's usage, which is the ticket's central claim.

**Choices I made:**
- **Shape.** The tests pin the sum in the existing third argument. The ticket's first option (one summed `usage`) is recommended in `.lore/dod.md`. An implementation that also adds a per-round breakdown as a fourth argument would keep these tests green.
- **Not tested at runtime.** The ticket's type-clarity criterion, the spec and CHANGELOG wording, and the CI gates are facets for the implementing round, not acceptance tests.
- **Spec not linked.** The spec's only unlinked testable statement is the under-counting bullet in `specs/hal-engine-config-hooks/spec.md`. I did not add a `validated by` link there, because the statement describes the behaviour the ticket replaces. The implementing round should rewrite it and add the link. I did not touch the `Status` row.
- **Existing test.** The ticket's no-tool-call criterion is covered by the existing `afterModelResponse receives collected response text and usage` test in `chatOrchestrator.test.ts`. I did not edit it.

`.lore/dod.md` records the strategy, both tests, and the facets. The commit is `55444c8`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}