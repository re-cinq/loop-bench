Acceptance tests for Ticket #37 (`ToolRegistry` input validation against declared `inputSchema`) are defined in `src/orchestration/tools/registry.acceptance.test.ts` with direct strategy in `.lore/dod.md` and spec coverage statements linked in `specs/hal-engine-tool-input-validation/spec.md`.

Execution output from `npm test -- src/orchestration/tools/registry.acceptance.test.ts`:

```
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input validation › returns a rejection describing missing required input without invoking the executor

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "executorCalled": false,
    -   "result": StringMatching /location/i,
    +   "executorCalled": true,
    +   "result": "ok",
      }

      27 |     const response = await registry.execute('get_weather', {});
      28 | 
    > 29 |     expect({executorCalled, result: response.result}).toEqual({
         |                                                       ^
      30 |       executorCalled: false,
      31 |       result: expect.stringMatching(/location/i),
      32 |     });

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:29:55)

  ● ToolRegistry input validation › redacts offending property values from validation failure messages

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "executorCalled": false,
    -   "hasKeyName": true,
    +   "executorCalled": true,
    +   "hasKeyName": false,
        "leaksValue": false,
      }

      63 |       hasKeyName: response.result.includes('apiKey'),
      64 |       leaksValue: response.result.includes(String(sensitiveValue)),
    > 65 |     }).toEqual({
         |        ^
      66 |       executorCalled: false,
      67 |       hasKeyName: true,
      68 |       leaksValue: false,

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:65:8)

  ● ToolRegistry input validation › throws at registration time for an uncompilable inputSchema naming the tool

    expect(received).toThrow(expected)

    Expected pattern: /invalid_tool/

    Received function did not throw

      85 |         execute
      86 |       );
    > 87 |     }).toThrow(/invalid_tool/);
         |        ^
      88 |   });
      89 | });
      90 | 

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:87:8)

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
Snapshots:   0 total
Time:        0.193 s, estimated 1 s
Ran all test suites matching src/orchestration/tools/registry.acceptance.test.ts.
```

The branch is up to date with `origin/main`, committed, and pushed to `origin/loop-bench/37`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}