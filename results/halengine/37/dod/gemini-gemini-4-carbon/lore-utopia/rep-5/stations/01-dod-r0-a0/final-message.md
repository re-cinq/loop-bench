Defined the executable Definition of Done (`direct` strategy) for #37 in commit `3e4a980` (`src/orchestration/tools/registry.acceptance.test.ts`, `specs/hal-engine-tool-input-validation/spec.md`, `.lore/dod.md`) and pushed to `origin/loop-bench/37`.

### Red bar output (`NODE_OPTIONS='--experimental-vm-modules' npx jest --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`)

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation › rejects an uncompilable static inputSchema at registration, naming the tool

    expect(received).toThrow(expected)

    Expected pattern: /broken_weather/

    Received function did not throw

      24 |         async () => 'unreachable'
      25 |       )
    > 26 |     ).toThrow(/broken_weather/);
         |       ^
      27 |   });

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:26:7)

  ● ToolRegistry inputSchema validation › returns a validation result without running the tool or leaking values

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "executorCalls": 0,
    +   "executorCalls": 1,
        "leaksValueInLogs": false,
        "leaksValueInResult": false,
    -   "namesExpectedType": true,
    -   "namesField": true,
    +   "namesExpectedType": false,
    +   "namesField": false,
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:70:8)

  ● ToolRegistry inputSchema validation › validates dynamic schemas per call and forwards extra keys unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 4

    @@ -3,8 +3,11 @@
        "receivedInputs": Array [
          Object {
            "traceId": "req-42",
            "units": "fahrenheit",
          },
    +     Object {
    +       "units": "fahrenheit",
    +     },
        ],
    -   "secondNamesField": true,
    +   "secondNamesField": false,
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:110:8)

  ● ToolRegistry inputSchema validation › feeds a rejected tool call back to the model so a retry can succeed

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 2

      Object {
        "executedLocations": Array [
    +     undefined,
          "Berlin",
        ],
    -   "rejectionNamedLocation": true,
    +   "rejectionNamedLocation": false,
        "reply": "Weather in Berlin: Sunny",
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:153:8)

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}