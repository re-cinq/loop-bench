I wrote two acceptance tests for #93. Both fail today because the hook reports only the last round's usage, as the ticket says. The branch is pushed and not ahead of its upstream, and the merge of `origin/main` produced no changes.

**Strategy: `direct`.** `createChatOrchestrator` with a scripted provider and an `afterModelResponse` hook is a real entry point today.

The tests are in `src/orchestration/turnUsage.acceptance.test.ts`. I ran them with `node --experimental-vm-modules node_modules/jest/bin/jest.js --silent <file>`.

1. **Sum across two tool rounds.** The scripted rounds report 100/10, 200/20 and 300/30 input/output tokens, so the hook should receive 600/60/660. It failed with:
   ```
   - "inputTokens": 600, - "outputTokens": 60, - "totalTokens": 660,
   + "inputTokens": 300, + "outputTokens": 30, + "totalTokens": 330,
   ```
2. **A round that reports nothing.** The scripted rounds report 100/10, none, then 300/30, so the hook should receive 400/40/440. An all-silent turn should still pass `undefined`. It failed with:
   ```
   "partial": - inputTokens 400 / outputTokens 40 / totalTokens 440
              + inputTokens 300 / outputTokens 30 / totalTokens 330
   ```
   The all-silent half already passes today, so only the partial case is red.

I left the existing no-tool test unedited, as the ticket's second criterion requires. Both tests assume the total is the hook's third argument. If the implementer also passes a per-round breakdown, the total has to stay third.

The type-clarity, spec-line and CHANGELOG criteria are listed as facets in `.lore/dod.md` rather than tested. They would only be source-text checks. I did not add a validated-by link on the spec's under-counting line (line 28), because it still describes the old behaviour. The implementing round should rewrite it and link it to these tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}