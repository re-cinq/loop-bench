The definition of done for #37 was already on the branch from an earlier round (commit `21a002e`, already pushed), so I added no new commit. I re-ran the five acceptance tests just now and all five fail because the registry doesn't validate input yet. The branch matches its upstream, and `origin/main` (`8c3318e`) is already merged in, so there was nothing to merge.

**Strategy: `direct`.** `ToolRegistry.execute` and `register` already exist and the tests call them directly. The tool-loop test goes through `createChatOrchestrator(...).processMessage`. The tests use real executors and a real logger sink, with no mocks.

The ticket's claim, as quoted in `.lore/dod.md`:
> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

Each test is cited from a statement in `specs/hal-engine-tool-input-validation/spec.md`. Output of `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts`:

- **Missing required `location` is rejected** (`registry.acceptance.test.ts`) — the executor ran and nothing was rejected:
  ```
  -   "executorCalls": 0,  -   "namesLocation": true,  -   "saysRequired": true,
  +   "executorCalls": 1,  +   "namesLocation": false, +   "saysRequired": false,
  ```
- **A wrong-typed field is rejected without its value being echoed** — the executor ran with the bad input. The value isn't leaked today only because the input never gets checked:
  ```
  -   "executorCalls": 0,  -   "namesExpectedType": true,  -   "namesPhone": true,
  +   "executorCalls": 1,  +   "namesExpectedType": false, +   "namesPhone": false,
  ```
- **`register` throws for a schema that can't compile, naming the tool**:
  ```
  Expected pattern: /broken_tool/
  Received function did not throw
  ```
- **A function-valued definition is checked against the schema current at that call**:
  ```
  -   "executorCalls": 1,  -   "namesQuery": true,
  +   "executorCalls": 2,  +   "namesQuery": false,
  ```
- **The tool loop survives a rejection and the provider sees it** (`chatOrchestrator.acceptance.test.ts`) — the executor received `{}`, and the provider never saw a rejection:
  ```
  +     Object {},
  -   "rejectionNamesLocation": true,  -   "rejectionSaysRequired": true,
  +   "rejectionNamesLocation": false, +   "rejectionSaysRequired": false,
  ```

**Note for the next round:** these suites only run in Jest's ES-module mode. Run them with `npm test -- <path>` or `node --experimental-vm-modules node_modules/jest/bin/jest.js`. A bare `npx jest` fails with "Must use import to load ES Module" before any test runs.

The ticket asks for further tests: extra properties pass through unchanged, a static schema is compiled once across ten calls, and the `Unknown tool` throw stays. `.lore/dod.md` hands these to the implementation rounds as their own tests, along with the doc, changelog and build items.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}