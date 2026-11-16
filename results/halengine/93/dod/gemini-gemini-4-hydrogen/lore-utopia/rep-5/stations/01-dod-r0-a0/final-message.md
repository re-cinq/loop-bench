Defined the Definition of Done for re-cinq/HALEngine#93 using the `direct` strategy and pushed commit `edd2a9f` to `origin/loop-bench/93` (up to date with `origin/main`).

### Artifacts
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — two red acceptance tests exercising `createChatOrchestrator` with `OrchestratorHooks.afterModelResponse`.
- `specs/hal-engine-config-hooks/spec.md` — replaced the out-of-scope under-counting bullet with `## Usage reported to afterModelResponse` citing both new acceptance tests and the existing unedited no-tool test (`src/orchestration/chatOrchestrator.test.ts#L236`).
- `.lore/dod.md` — recorded the verbatim claim, `direct` strategy, acceptance tests, implementation facets, and out-of-scope items.

### Red-bar output
Command: `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › reports the sum of three provider calls when a turn runs two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 600,
    -   "outputTokens": 60,
    -   "totalTokens": 660,
    +   "inputTokens": 300,
    +   "outputTokens": 30,
    +   "totalTokens": 330,
      }

      27 |     ]);
      28 |
    > 29 |     expect(reported).toEqual({inputTokens: 600, outputTokens: 60, totalTokens: 660});
         |                      ^
      30 |   });
      31 |
      32 |   it('counts the rounds that reported usage when one round reports none, and reports nothing when no round did', async () => {

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:29:22)

  ● afterModelResponse usage across tool rounds › counts the rounds that reported usage when one round reports none, and reports nothing when no round did

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "partial": Object {
    -     "inputTokens": 12,
    -     "outputTokens": 3,
    -     "totalTokens": 15,
    +     "inputTokens": 5,
    +     "outputTokens": 1,
    +     "totalTokens": 6,
        },
        "silent": undefined,
      }

      47 |     ]);
      48 |
    > 49 |     expect({partial, silent}).toEqual({
         |                               ^
      50 |       partial: {inputTokens: 12, outputTokens: 3, totalTokens: 15},
      51 |       silent: undefined,
      52 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:49:31)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}