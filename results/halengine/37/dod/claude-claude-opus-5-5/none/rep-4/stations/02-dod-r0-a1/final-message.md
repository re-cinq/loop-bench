The Definition of Done for #37 was already on the branch from an earlier round (commit `678f197`), so I changed nothing. I re-ran all five acceptance tests and each one fails because validation is missing.

- **Already pushed:** `HEAD` is the same commit as `origin/loop-bench/37`.
- **Up to date with main:** `origin/main` is already merged in, and nothing on main resolves #37.
- **Strategy is `direct`:** `ToolRegistry.execute`/`register` and `createChatOrchestrator(...).processMessage` are the seams. The tests use real executors and a real `Logger`, with no mocks.
- **Contents:** `.lore/dod.md` quotes the ticket's claim: "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`". The new `specs/hal-engine-tool-input-validation/spec.md` links each statement to its test.

Command: `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts`. A plain `npx jest` errors with "Must use import to load ES Module", so the repo's `npm test` wrapper is needed.

```
● ToolRegistry input validation › answers input missing a required property with a result naming it, and never runs the executor
    -   "executorCalls": 0,
    -   "namesLocation": true,
    -   "saysRequired": true,
    +   "executorCalls": 1,
    +   "namesLocation": false,
    +   "saysRequired": false,

● ToolRegistry input validation › rejects a wrong-typed field by path and expected type without echoing its value in the result or the logs
    -   "executorCalls": 0,
    +   "executorCalls": 1,
    -   "namesExpectedType": true,
    -   "namesPath": true,
    +   "namesExpectedType": false,
    +   "namesPath": false,

● ToolRegistry input validation › throws at register time for a schema that cannot compile, naming the tool
    Expected substring: "get_weather"
    Received string:    "registered without throwing"

● ToolRegistry input validation › validates a function-valued definition against the schema current at each call
    (executor ran twice with {location: "Berlin"}; second result did not name `city`)
    -   "secondNamesCity": true,
    +   "secondNamesCity": false,

● ChatOrchestrator tool loop with input validation › resolves after a rejected tool call and shows the rejection to the provider on the next round
      "outcome": "Sunny in Berlin",
    -   "rejectionIsNotAForecast": true,
    -   "rejectionNamesLocation": true,
    -   "rejectionSaysRequired": true,
    +   "rejectionIsNotAForecast": false,
    +   "rejectionNamesLocation": false,
    +   "rejectionSaysRequired": false,
```

In every case the executor runs on input the schema should reject, and the model gets a forecast back instead of a rejection.

Three spec statements have no acceptance test yet: extra properties pass through unchanged, a static schema is compiled once, and `Unknown tool: <name>` is still thrown. The ticket asks for these to be pinned in `src/orchestration/tools/registry.test.ts`, which `.lore/dod.md` leaves to the implementation rounds.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}