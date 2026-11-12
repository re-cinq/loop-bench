Acceptance tests defining DONE for Ticket #37 have been established in `src/orchestration/tools/registry.acceptance.test.ts` and tracked in `.lore/dod.md` with strategy `direct`. Spec statement links in `specs/hal-engine-tool-input-validation/spec.md` cite each test declaration directly.

Running `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts` yields:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation acceptance › returns a ToolResponse naming the missing required field and does not invoke the executor

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "executorCalled": false,
    -   "mentionsLocation": true,
    +   "executorCalled": true,
    +   "mentionsLocation": false,
      }

      27 |     const response = await registry.execute('weather', {});
      28 |
    > 29 |     expect({executorCalled, mentionsLocation: response.result.includes('location')}).toEqual({
         |                                                                                      ^
      30 |       executorCalled: false,
      31 |       mentionsLocation: true,
      32 |     });

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:29:86)

  ● ToolRegistry inputSchema validation acceptance › rejects a call whose field type is wrong, naming the field path and expected type but not the value

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "executorCalled": false,
    -   "namesField": true,
    -   "namesType": true,
    +   "executorCalled": true,
    +   "namesField": false,
    +   "namesType": false,
        "redactsValue": true,
      }

      63 |       namesType: response.result.includes('string'),
      64 |       redactsValue: !response.result.includes(String(sensitiveValue)),
    > 65 |     }).toEqual({
         |        ^
      66 |       executorCalled: false,
      67 |       namesField: true,
      68 |       namesType: true,

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:65:8)

  ● ToolRegistry inputSchema validation acceptance › throws at register time when the inputSchema is uncompilable and the message names the tool

    expect(received).toThrow(expected)

    Expected pattern: /broken_tool/

    Received function did not throw

      85 |         async () => 'ok'
      86 |       );
    > 87 |     }).toThrow(/broken_tool/);
         |        ^
      88 |   });
      89 | });

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
Snapshots:   0 total
Time:        0.207 s, estimated 1 s
Ran all test suites matching src/orchestration/tools/registry.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}