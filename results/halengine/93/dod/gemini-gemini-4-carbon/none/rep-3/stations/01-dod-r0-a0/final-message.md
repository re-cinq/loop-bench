Defined the executable Definition of Done for **re-cinq/HALEngine#93** using strategy **`direct`**, committed and pushed to `origin/loop-bench/93` (`4483f0e`):

- `src/orchestration/chatOrchestrator.acceptance.test.ts` — two red acceptance tests exercising `createChatOrchestrator` across two tool rounds (three provider calls with distinct token counts) and across partial/absent round usage.
- `specs/hal-engine-config-hooks/spec.md` — replaced the recorded `lastUsage` under-counting note with the multi-round summation and partial/absent usage guarantees citing `#L71` and `#L84`.
- `.lore/dod.md` — verbatim central claim, `direct` triage, failing acceptance tests, implementation facets (including signature/type choice rationale, doc-blocks sync, and `CHANGELOG.md`), and out-of-scope boundaries.

### Red bar output

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › sums usage across every provider call when a turn runs two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "reported": Object {
    -     "inputTokens": 740,
    -     "outputTokens": 105,
    -     "totalTokens": 845,
    +     "inputTokens": 410,
    +     "outputTokens": 50,
    +     "totalTokens": 460,
        },
        "toolExecutions": 2,
      }

      76 |     ]);
      77 |
    > 78 |     expect(turnOutcome).toEqual({
         |                         ^
      79 |       toolExecutions: 2,
      80 |       reported: {inputTokens: 740, outputTokens: 105, totalTokens: 845},
      81 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:78:25)

  ● afterModelResponse usage across tool rounds › counts rounds that reported usage when other rounds omit it, and reports undefined when none did

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "partial": Object {
    -     "inputTokens": 410,
    -     "outputTokens": 65,
    -     "totalTokens": 475,
    +     "inputTokens": 310,
    +     "outputTokens": 45,
    +     "totalTokens": 355,
        },
        "silent": undefined,
      }

      90 |     const silent = await runUsageTurn([undefined, undefined]);
      91 |
    > 92 |     expect({partial: partial.reported, silent: silent.reported}).toEqual({
         |                                                                  ^
      93 |       partial: {inputTokens: 410, outputTokens: 65, totalTokens: 475},
      94 |       silent: undefined,
      95 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:92:66)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}