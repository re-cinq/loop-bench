Branch `loop-bench/37` (already committed and pushed at `060f26b` and up to date with `origin/main` at `8c3318e`) holds `.lore/dod.md`, `specs/hal-engine-tool-input-validation/spec.md`, `src/orchestration/tools/registry.acceptance.test.ts`, and `src/orchestration/chatOrchestrator.acceptance.test.ts`. Prettier formatting and spec-link/anchor/status checks pass (`stale: 0, up to date: 404, unresolved: 0, mislabelled: 0`; `misplaced: 0`; `spec-status: 0 findings`).

Running the two acceptance suites fails on all 5 tests because `ToolRegistry` does not yet compile or validate `inputSchema`:

```text
npm run test -- --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts

FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator tool validation retry loop (acceptance) › returns schema rejection to the model so it can retry with valid input and resolve
      Object {
        "executorCalls": Array [
    +     Object {},
          Object {
            "location": "Berlin",
          },
        ],
        "reply": "Weather in Berlin: Sunny",
    -   "roundTwoToolResult": StringMatching /(?=.*location)(?=.*required)/i,
    +   "roundTwoToolResult": "Sunny in undefined",
      }

FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation (acceptance) › rejects missing required, wrong-typed, and disallowed-enum input before calling the executor without leaking offending values
      Object {
    -   "executorCalls": 0,
    +   "executorCalls": 3,
        "leakedEnum": false,
        "leakedNumeric": false,
    -   "missingResult": StringMatching /(?=.*location)(?=.*required)/i,
    -   "unlistedEnumResult": StringMatching /units/i,
    -   "wrongTypeResult": StringMatching /(?=.*location)(?=.*string)/i,
    +   "missingResult": "ok",
    +   "unlistedEnumResult": "ok",
    +   "wrongTypeResult": "ok",
      }

  ● ToolRegistry inputSchema validation (acceptance) › passes valid input with unlisted properties and omitted defaulted fields through unmodified while rejecting uncoerced type mismatches
        "receivedInputs": Array [
          Object {
            "extraField": "preserved",
            "location": "Berlin",
          },
    +     Object {
    +       "days": "3",
    +       "location": "Berlin",
    +     },
        ],
    -   "uncoercedResult": StringMatching /(?=.*days)(?=.*number)/i,
    +   "uncoercedResult": "ok",

  ● ToolRegistry inputSchema validation (acceptance) › throws synchronously at register time for an uncompilable inputSchema and names the tool
    Expected pattern: /broken_tool/
    Received function did not throw

  ● ToolRegistry inputSchema validation (acceptance) › validates a function-valued ToolDefinitionSource against the schema returned on each call
      Object {
    -   "afterChangeResult": StringMatching /(?=.*secondField)(?=.*required)/i,
    -   "executorCalls": 1,
    +   "afterChangeResult": "ok",
    +   "executorCalls": 2,
        "firstResult": "ok",
      }

Test Suites: 2 failed, 2 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}