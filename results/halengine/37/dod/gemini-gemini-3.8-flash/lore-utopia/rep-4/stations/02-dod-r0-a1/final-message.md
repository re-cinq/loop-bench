The acceptance tests for Ticket #37 ("Validate tool input against the registered inputSchema") have been defined in `src/orchestration/tools/registry.acceptance.test.ts`, documented in `.lore/dod.md` using the `direct` triage strategy, linked in `specs/hal-engine-tool-input-validation/spec.md`, and committed and pushed to `origin/loop-bench/37`.

### Test Execution & Failure Output

Command run:
```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts
```

Output:
```
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input validation acceptance › returns a ToolResponse naming the missing required field and does not invoke the executor

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "executorCallCount": 0,
    -   "hasLocationInResult": true,
    +   "executorCallCount": 1,
    +   "hasLocationInResult": false,
      }

      28 |       executorCallCount,
      29 |       hasLocationInResult: response.result.toLowerCase().includes('location'),
    > 30 |     }).toEqual({
         |        ^
      31 |       executorCallCount: 0,
      32 |       hasLocationInResult: true,
      33 |     });

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:30:8)

  ● ToolRegistry input validation acceptance › rejects a call whose field type is wrong, naming the field path and expected type but not the value

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "executorCallCount": 0,
    +   "executorCallCount": 1,
        "leaksOffendingValue": false,
    -   "namesExpectedType": true,
    -   "namesFieldPath": true,
    +   "namesExpectedType": false,
    +   "namesFieldPath": false,
      }

      63 |       namesExpectedType: response.result.toLowerCase().includes('number'),
      64 |       leaksOffendingValue: response.result.includes(sensitiveStringValue),
    > 65 |     }).toEqual({
         |        ^
      66 |       executorCallCount: 0,
      67 |       namesFieldPath: true,
      68 |       namesExpectedType: true,

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:65:8)

  ● ToolRegistry input validation acceptance › throws at register time when the inputSchema is uncompilable and the message names the tool

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "didThrow": true,
    -   "messageNamesTool": true,
    +   "didThrow": false,
    +   "messageNamesTool": false,
      }

       97 |       didThrow: thrownMessage !== null,
       98 |       messageNamesTool: thrownMessage?.includes('broken_tool') ?? false,
    >  99 |     }).toEqual({
          |        ^
      100 |       didThrow: true,
      101 |       messageNamesTool: true,
      102 |     });

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:99:8)

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
Snapshots:   0 total
Time:        0.203 s, estimated 1 s
Ran all test suites matching src/orchestration/tools/registry.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}