I have defined the Definition of Done in `.lore/dod.md`, created `specs/hal-engine-tool-input-validation/spec.md`, and committed the red acceptance tests in `src/orchestration/tools/registry.acceptance.test.ts` (strategy: `direct`).

### Acceptance Test Failure Output

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input validation › returns a ToolResponse naming the missing required field and does not invoke the executor

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "calls": 0,
    -   "mentionsLocation": true,
    +   "calls": 1,
    +   "mentionsLocation": false,
      }

      21 |     const response = await registry.execute('get_weather', {});
      22 |
    > 23 |     expect({calls, mentionsLocation: response.result.includes('location')}).toEqual({
         |                                                                             ^
      24 |       calls: 0,
      25 |       mentionsLocation: true,
      26 |     });

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:23:77)

  ● ToolRegistry input validation › rejects a wrong-typed field naming the field path and expected type while omitting the offending value from the result and logs

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "calls": 0,
    +   "calls": 1,
        "leakedInLogs": false,
        "leakedInResult": false,
    -   "namesField": true,
    -   "namesType": true,
    +   "namesField": false,
    +   "namesType": false,
      }

      60 |         leakedInResult: response.result.includes(secret),
      61 |         leakedInLogs: allLogs.includes(secret),
    > 62 |       }).toEqual({
         |          ^
      63 |         calls: 0,
      64 |         namesField: true,
      65 |         namesType: true,

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:62:10)

  ● ToolRegistry input validation › throws at register time when the inputSchema is uncompilable and names the tool

    expect(received).toThrow(expected)

    Expected pattern: /broken_tool/

    Received function did not throw

      84 |         async () => 'ok'
      85 |       )
    > 86 |     ).toThrow(/broken_tool/);
         |       ^
      87 |   });
      88 | });
      89 |

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:86:7)

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
Snapshots:   0 total
Time:        0.463 s
Ran all test suites matching src/orchestration/tools/registry.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}