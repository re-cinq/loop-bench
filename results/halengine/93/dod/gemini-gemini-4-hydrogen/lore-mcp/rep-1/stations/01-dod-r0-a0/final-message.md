Defined the Definition of Done for re-cinq/HALEngine#93 using the `direct` strategy and pushed commit `6616c1a` to `origin/loop-bench/93` (`origin/main` already up to date, working tree clean).

### Changed files
- `.lore/dod.md` — verbatim claim, `direct` strategy, acceptance tests, implementation facets (including signature/type choice, `specs/hal-engine-config-hooks/spec.md` decision note, and `CHANGELOG.md`), and out-of-scope items
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — two acceptance tests covering summed usage across a two-tool-round turn and partial/omitted round usage handling
- `specs/hal-engine-config-hooks/spec.md` — replaced the `lastUsage` under-counting note in `Measured semantics — out of scope` with linked normative statements citing the new acceptance tests

### Red bar output (`npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`)
```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › sums token usage across all provider calls in a turn with two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 750,
    -   "outputTokens": 105,
    -   "totalTokens": 855,
    +   "inputTokens": 400,
    +   "outputTokens": 50,
    +   "totalTokens": 450,
      }

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:27:27)

  ● afterModelResponse usage across tool rounds › counts reported rounds when some omit usage and reports undefined when none report

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "partialTurnUsage": Object {
    -     "inputTokens": 40,
    -     "outputTokens": 13,
    -     "totalTokens": 53,
    +     "inputTokens": 30,
    +     "outputTokens": 8,
    +     "totalTokens": 38,
        },
        "unreportedTurnUsage": undefined,
      }

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:57:53)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}