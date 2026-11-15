Defined Done for `re-cinq/HALEngine#37` using the `direct` strategy (`6734214` pushed to `origin/loop-bench/37`):

- **`src/orchestration/tools/registry.acceptance.test.ts`** — 4 red acceptance tests against `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator`.
- **`specs/hal-engine-tool-input-validation/spec.md`** — contract statements with inline `([validated by: ...])` anchors (`In Progress` until the implementation round links unit coverage for single static compilation and `Unknown tool: <name>`).
- **`.lore/dod.md`** — verbatim claim quote, `direct` triage, failing acceptance tests, implementation facets, and out-of-scope boundaries.

### Red bar output (`npm test -- --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`)

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation › rejects input that violates required, type, or enum constraints without calling the executor or leaking values

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 4

      Object {
    -   "executorCalls": 0,
    +   "executorCalls": 3,
        "leakedInLogs": false,
        "leakedInResults": false,
    -   "missingNamesLocation": true,
    -   "wrongEnumNamesField": true,
    -   "wrongTypeNamesFieldAndType": true,
    +   "missingNamesLocation": false,
    +   "wrongEnumNamesField": false,
    +   "wrongTypeNamesFieldAndType": false,
      }

  ● ToolRegistry inputSchema validation › throws at registration time naming the tool when a static inputSchema cannot be compiled

    expect(received).toThrow(expected)

    Expected pattern: /broken_tool/

    Received function did not throw

  ● ToolRegistry inputSchema validation › validates against the schema a function-valued definition returns on each call and forwards extra properties unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 8

      Object {
    -   "firstRejectedQuery": true,
    +   "firstRejectedQuery": false,
        "receivedInputs": Array [
    +     Object {
    +       "topic": "mars",
    +     },
          Object {
            "query": "mars",
            "traceId": "req-7",
    +     },
    +     Object {
    +       "query": "mars",
          },
          Object {
            "topic": "mars",
          },
        ],
    -   "secondRejectedTopic": true,
    +   "secondRejectedTopic": false,
      }

  ● ToolRegistry inputSchema validation › feeds a schema rejection back through the orchestrator tool loop so the model can correct its call on the next round

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 2

      Object {
        "executedInputs": Array [
    +     Object {},
          Object {
            "location": "Berlin",
          },
        ],
        "reply": "Berlin is 18C.",
    -   "roundTwoSawLocationRejection": true,
    +   "roundTwoSawLocationRejection": false,
      }

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}