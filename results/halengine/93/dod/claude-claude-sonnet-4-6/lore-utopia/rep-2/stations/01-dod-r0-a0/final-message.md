Pushed successfully. Here's the summary:

**Strategy: `direct`** — the seam exists; `createChatOrchestrator` accepts hooks and can be driven with a scripted provider.

**Acceptance test** (`src/orchestration/chatOrchestrator.acceptance.test.ts`):

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● afterModelResponse usage accumulation › receives summed usage when two tool rounds each report known different token counts

    - Expected  - 3
    + Received  + 3
      Object {
    -   "inputTokens": 30,
    -   "outputTokens": 13,
    -   "totalTokens": 43,
    +   "inputTokens": 20,
    +   "outputTokens": 8,
    +   "totalTokens": 28,
      }
```

The test drives two scripted tool rounds (round 1: `{10,5,15}`, round 2: `{20,8,28}`) and asserts the hook receives the sum `{30,13,43}`. It fails because `lastUsage = outcome.usage ?? lastUsage` returns only the last round's value.

A spec statement was added to `specs/hal-engine-config-hooks/spec.md` with a `([validated by: ...])` link so `require-spec-link` doesn't block CI. The existing test "receives collected response text and usage" in `chatOrchestrator.test.ts` pins criterion 2 (no-tool-call turns unchanged) without any edits.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}