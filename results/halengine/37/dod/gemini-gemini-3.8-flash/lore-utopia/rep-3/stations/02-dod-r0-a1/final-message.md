### Definition of Done: Ticket #37 (Validate tool input against the registered inputSchema)

- **Strategy:** `direct` — `ToolRegistry.execute` is the public entry point for tool execution. Acceptance tests call `registry.execute` directly on a real `ToolRegistry` instance and observe that input validation against `inputSchema` is performed before the executor is invoked.
- **Acceptance Test File:** `src/orchestration/tools/registry.acceptance.test.ts`
- **Spec:** `specs/hal-engine-tool-input-validation/spec.md` with validated-by traceability anchors matching the test cases.
- **DoD:** `.lore/dod.md`

#### Failure Output (`npm test -- src/orchestration/tools/registry.acceptance.test.ts`)

```
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry.execute — input validation › returns a ToolResponse naming the missing required field and does not invoke the executor

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "executorCalls": 0,
    -   "toolResult": StringMatching /location/,
    +   "executorCalls": 1,
    +   "toolResult": "sunny",
      }

      22 |     const toolResponse = await registry.execute('weather', {});
      23 |
    > 24 |     expect({toolResult: toolResponse.result, executorCalls}).toEqual({
         |                                                              ^
      25 |       toolResult: expect.stringMatching(/location/),
      26 |       executorCalls: 0,
      27 |     });

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:24:62)

  ● ToolRegistry.execute — input validation › rejects a wrong-typed field naming the field path and expected type without leaking the offending value

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "hasFieldName": true,
    +   "hasFieldName": false,
        "hasOffendingValue": false,
    -   "hasType": true,
    +   "hasType": false,
      }

      50 |       hasType: /string/.test(toolResponse.result),
      51 |       hasOffendingValue: /42/.test(allOutput),
    > 52 |     }).toEqual({hasFieldName: true, hasType: true, hasOffendingValue: false});
         |        ^
      53 |   });
      54 |
      55 |   it('throws at register time when the inputSchema is uncompilable and the message names the tool', () => {

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:52:8)

  ● ToolRegistry.execute — input validation › throws at register time when the inputSchema is uncompilable and the message names the tool

    expect(received).toThrow(expected)

    Expected pattern: /broken/

    Received function did not throw

      61 |         async () => 'x'
      62 |       )
    > 63 |     ).toThrow(/broken/);
         |       ^
      64 |   });
      65 |
      66 |   it('validates each call against the schema a function-valued definition source returns at that call', async () => {

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:63:7)

  ● ToolRegistry.execute — input validation › validates each call against the schema a function-valued definition source returns at that call

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "firstRejectsAlpha": true,
    -   "secondRejectsBeta": true,
    +   "firstRejectsAlpha": false,
    +   "secondRejectsBeta": false,
      }

      86 |       firstRejectsAlpha: /alpha/.test(firstResponse.result),
      87 |       secondRejectsBeta: /beta/.test(secondResponse.result),
    > 88 |     }).toEqual({firstRejectsAlpha: true, secondRejectsBeta: true});
         |        ^
      89 |   });
      90 | });

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
Snapshots:   0 total
Time:        0.202 s, estimated 1 s
Ran all test suites matching src/orchestration/tools/registry.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}