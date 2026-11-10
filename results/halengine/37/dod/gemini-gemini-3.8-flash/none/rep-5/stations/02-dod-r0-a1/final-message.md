### Acceptance Tests & Red Bar Verification

Acceptance tests for ticket #37 are defined in `src/orchestration/tools/registry.acceptance.test.ts`, with triage recorded in `.lore/dod.md` (Strategy: `direct`) and traced to `specs/hal-engine-tool-input-validation/spec.md`.

Ran the acceptance tests with:
`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`

Actual failure output:
```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input validation › rejects schema-invalid input with a ToolResponse describing the failure without invoking the executor

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "executorCalls": 0,
    -   "result": StringMatching /location/,
    +   "executorCalls": 1,
    +   "result": "weather-report",
      }

      28 |     const response = await registry.execute('weather', {});
      29 |
    > 30 |     expect({executorCalls, result: response.result}).toEqual({
         |                                                      ^
      31 |       executorCalls: 0,
      32 |       result: expect.stringMatching(/location/),
      33 |     });

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:30:54)

  ● ToolRegistry input validation › rejects wrong-typed input with an error naming the property without exposing values

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "executorCalls": 0,
    +   "executorCalls": 1,
        "leaksValue": false,
    -   "mentionsLocation": true,
    +   "mentionsLocation": false,
      }

      64 |       mentionsLocation: response.result.includes('location'),
      65 |       leaksValue: response.result.includes('12345') || response.result.includes('confidential-token-value'),
    > 66 |     }).toEqual({
         |        ^
      67 |       executorCalls: 0,
      68 |       mentionsLocation: true,
      69 |       leaksValue: false,

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:66:8)

  ● ToolRegistry input validation › throws at registration time when a static tool declares an uncompilable inputSchema

    expect(received).toThrow(expected)

    Expected pattern: /brokenTool/

    Received function did not throw

      83 |     expect(() => {
      84 |       registry.register(brokenDefinition, async () => 'result');
    > 85 |     }).toThrow(/brokenTool/);
         |        ^
      86 |   });
      87 | });

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
Snapshots:   0 total
Time:        0.195 s, estimated 1 s
Ran all test suites matching src/orchestration/tools/registry.acceptance.test.ts.
```

The branch is up to date with base `origin/main` and pushed to `origin/loop-bench/37`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}