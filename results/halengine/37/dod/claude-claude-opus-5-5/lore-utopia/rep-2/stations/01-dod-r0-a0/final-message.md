I've added three acceptance tests for ticket #37. All three fail today, and each fails because `ToolRegistry.execute` runs the executor without checking the input against the declared `inputSchema`. They are committed and pushed to `loop-bench/37`. The branch was already up to date with `origin/main`, and `git status` reports it up to date with its upstream.

**Strategy: `direct`.** `ToolRegistry.execute` can already be called from a test. The tests register a real tool with a real schema and call `execute` directly, or go through `createChatOrchestrator(...).processMessage` for the full tool loop. No mocks.

**What I added:**
- `src/orchestration/tools/registry.acceptance.test.ts`: two tests.
  - Missing required property: the result must name `location` as required, and the executor must not run.
  - Wrong-typed field: the result must name the field and the expected type, and the field's value must appear in neither the result nor any log line.
- `src/orchestration/chatOrchestrator.acceptance.test.ts`: one test. A rejected tool call is followed by a corrected retry. `processMessage` must resolve, the provider must see the rejection text on the next round, and the executor must run once, with the corrected input only.
- `specs/hal-engine-tool-input-validation/spec.md`: a new spec with status In Progress. Three statements link to these tests. The rest are not linked yet: extra properties pass through unchanged, the `Unknown tool` throw stays, `register` throws for an uncompilable schema, and function-valued schemas are validated per call. Their tests are the ones the ticket asks for in `registry.test.ts`.
- `.lore/dod.md`: the ticket's claim quoted, the strategy, the tests, the remaining steps, and what is out of scope.

**Failure output** (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts`):
```
● ToolRegistry.execute input validation › returns a rejection naming the missing required property and never invokes the executor
    -   "executorCalls": 0,
    -   "namesLocation": true,
    -   "saysRequired": true,
    +   "executorCalls": 1,
    +   "namesLocation": false,
    +   "saysRequired": false,

● ToolRegistry.execute input validation › rejects a wrong-typed field by path and expected type without echoing its value in the result or any log line
    -   "executorCalls": 0,
    -   "namesExpectedType": true,
    -   "namesPath": true,
    +   "executorCalls": 1,
    +   "namesExpectedType": false,
    +   "namesPath": false,
        "valueInLogs": false,
        "valueInResult": false,

● ChatOrchestrator with a schema-rejected tool call › resolves after a rejected call and a corrected retry, with the rejection visible to the provider
        "executorInputs": Array [
    +     Object {},
          Object { "location": "Berlin" },
        ],
        "outcome": "resolved: sunny",
    -   "rejectionSeenOnRound2": true,
    +   "rejectionSeenOnRound2": false,
```

In the second test, the "value not leaked" checks pass today only because nothing echoes the value yet. They are there to stop the rejection message, once it exists, from echoing the value.

**For the next round:**
- The repo has no `scripts/spec-links/reanchor.mjs`, so I checked the three `#L` links by hand: they point at lines 37, 51 and 23.
- No lint or typecheck was run here; CI will judge both.
- The docs, the `CHANGELOG.md` entry and the migration note in the PR body are listed as unfinished steps in `dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}