I wrote four acceptance tests for the ticket. All four fail now for the reason the ticket gives, and they're committed and pushed. The branch was already up to date with `origin/main` and isn't ahead of its upstream.

**Strategy: `direct`.** `ToolRegistry.register` and `execute` can be called directly, and the tool loop can be reached through `createChatOrchestrator(...).processMessage` with a scripted provider. No mocks were needed.

**What I committed:**
- **The tests**, in `src/orchestration/tools/registry.acceptance.test.ts`:
  1. **returns a rejection naming the missing required property and never calls the executor** — `execute('get_weather', {})` should name `location`, and the executor should be called 0 times.
  2. **rejects a wrong-typed field by path and expected type without echoing any input value into the result or logs** — the message should name `location` and `string`, and no value should appear in the result or in any log line.
  3. **throws at register time for an uncompilable schema, naming the tool** — `register` should throw with the tool's name.
  4. **resolves after a rejected call and a corrected retry, showing the rejection to the provider and passing the retry through unchanged** — `processMessage` should resolve, the provider should see the rejection on the next round, and the executor should receive the retry exactly once, unchanged, including an extra property.
- **The spec**, `specs/hal-engine-tool-input-validation/spec.md`. It's new, so I set its Status to `In Progress`. The four statements these tests validate have `([validated by ...])` links. Five statements have no link yet, for the implementing round's own tests: compile once, function-valued schema checked fresh each call, `Unknown tool` still thrown, no coercion or defaults, and the tool-round bound.
- **`.lore/dod.md`**, which quotes the ticket's claim and lists the facets still owed.

**Failure output** (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`):
```
  ● ... › returns a rejection naming the missing required property and never calls the executor
    -   "executorCalls": 0,
    -   "mentionsLocation": true,
    +   "executorCalls": 1,
    +   "mentionsLocation": false,
  ● ... › rejects a wrong-typed field by path and expected type without echoing any input value into the result or logs
    -   "executorCalls": 0,
    +   "executorCalls": 1,
    -   "leaksNumber": false,
    -   "namesExpectedType": true,
    -   "namesPath": true,
    +   "leaksNumber": true,
    +   "namesExpectedType": false,
    +   "namesPath": false,
  ● ... › throws at register time for an uncompilable schema, naming the tool
    Expected pattern: /broken_tool/
    Received function did not throw
  ● ... › resolves after a rejected call and a corrected retry, ...
        "executorInputs": Array [
    +     Object {},
          Object { "location": "Berlin", "units": "C" },
    -   "rejectionVisibleOnNextRound": true,
    +   "rejectionVisibleOnNextRound": false,
Tests:       4 failed, 4 total
```
In every case the executor runs with input that was never checked, which is exactly the ticket's complaint. In test 4, `processMessage` already resolves today, because the unvalidated call doesn't throw. What fails there is that the executor gets `{}` and the provider never sees a rejection.

**Things CI will judge that I didn't run:** lint, typecheck and the spec-link and spec-status checks were not run here, as instructed. The spec's `In Progress` status follows the citation rule in AGENTS.md, but CI's coverage rule decides whether it's accepted.

**Something else I noticed:** `example/weather-tool.ts` casts and defaults its input (`|| 'Unknown'`). That cast should be removed once validation lands, so I listed it as a facet in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}