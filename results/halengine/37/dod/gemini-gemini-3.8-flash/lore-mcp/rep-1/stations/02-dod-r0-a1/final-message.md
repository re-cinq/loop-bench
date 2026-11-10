## Definition of Done: Ticket #37 (Validate tool input against the registered inputSchema)

### Quoted Claim
> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

### Strategy: `direct`
`ToolRegistry.execute` and `ToolRegistry.register` exist as public methods on `ToolRegistry`. The acceptance tests call them directly on real instances with schema-constrained tools to verify compile-time schema validation and pre-execution input validation.

### Acceptance Test File
`src/orchestration/tools/registry.acceptance.test.ts` (cited by statements in `specs/hal-engine-tool-input-validation/spec.md`).

Tests:
1. `returns a ToolResponse naming the missing required field and does not invoke the executor`
2. `rejects a call whose field type is wrong, naming the field path and expected type but not the value`
3. `throws at register time when the inputSchema is uncompilable and the message names the tool`

### Test Execution Output

```
> @re-cinq/hal-engine@0.3.0 test
> node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts

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

      19 |     const toolResponse = await registry.execute('weather', {});
      20 |
    > 21 |     expect({toolResult: toolResponse.result, executorCalls}).toEqual({
         |                                                              ^
      22 |       toolResult: expect.stringMatching(/location/),
      23 |       executorCalls: 0,
      24 |     });

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:21:62)

  ● ToolRegistry.execute — input validation › rejects a call whose field type is wrong, naming the field path and expected type but not the value

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "hasFieldName": true,
    -   "hasType": true,
    +   "hasFieldName": false,
    +   "hasType": false,
        "hasValue": false,
      }

      42 |       hasType: /string/.test(toolResponse.result),
      43 |       hasValue: /42/.test(toolResponse.result),
    > 44 |     }).toEqual({hasFieldName: true, hasType: true, hasValue: false});
         |        ^
      45 |   });
      46 |
      47 |   it('throws at register time when the inputSchema is uncompilable and the message names the tool', () => {

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:44:8)

  ● ToolRegistry.execute — input validation › throws at register time when the inputSchema is uncompilable and the message names the tool

    expect(received).toThrow(expected)

    Expected pattern: /broken/

    Received function did not throw

      53 |         async () => 'x'
      54 |       )
    > 55 |     ).toThrow(/broken/);
         |       ^
      56 |   });
      57 | });
      58 |

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:55:7)

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
Snapshots:   0 total
Time:        0.446 s, estimated 1 s
Ran all test suites matching src/orchestration/tools/registry.acceptance.test.ts.
```

The branch is up to date and pushed to `origin/loop-bench/37`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}