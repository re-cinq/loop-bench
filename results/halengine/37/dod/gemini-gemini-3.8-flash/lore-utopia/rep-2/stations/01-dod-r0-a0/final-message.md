### Definition of Done & Acceptance Tests

Defined DONE for **Ticket #37: Validate tool input against the registered inputSchema**.

- **Strategy**: `direct` — `ToolRegistry.execute` and `ToolRegistry.register` already exist as public methods; acceptance tests exercise them directly with real inputs, real schemas, and no mocks or stubs.
- **Specification**: Created `specs/hal-engine-tool-input-validation/spec.md` with requirement statements cited by inline `([validated by: ...](...))` parentheticals pointing directly to the declarations in the new acceptance test file.
- **Acceptance Tests**: Created `src/orchestration/tools/registry.acceptance.test.ts` beside the code with 3 acceptance tests asserting the core validation contract:
  1. `returns a ToolResponse naming the missing required field and does not invoke the executor`
  2. `rejects a call whose field type is wrong, naming the field path and expected type but not the value`
  3. `throws at register time when the inputSchema is uncompilable and the message names the tool`

### Actual Test Failure Output

Running `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input validation › returns a ToolResponse naming the missing required field and does not invoke the executor

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

  ● ToolRegistry input validation › rejects a call whose field type is wrong, naming the field path and expected type but not the value

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

  ● ToolRegistry input validation › throws at register time when the inputSchema is uncompilable and the message names the tool

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
Time:        0.263 s
Ran all test suites matching src/orchestration/tools/registry.acceptance.test.ts.
```

The tests were formatted with Prettier, committed to `loop-bench/37`, and pushed to `origin/loop-bench/37`. The working tree is clean and up to date with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}