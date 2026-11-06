The acceptance tests for #37 were already on the branch from an earlier round (commit `d8bad13`), so I wrote no new tests and made no commit this time. I ran them again and all five fail because input validation doesn't exist yet. The branch is already pushed: `HEAD` equals `origin/loop-bench/37` at `d8bad13`, `origin/main` is already merged in, and `git status` shows nothing ahead.

**Strategy: `direct`.** The tests call `ToolRegistry.register` and `execute` directly, and run `createChatOrchestrator` with a stub provider. They're in `src/orchestration/tools/registry.acceptance.test.ts`, and each one is cited from `specs/hal-engine-tool-input-validation/spec.md`. `.lore/dod.md` quotes the ticket's claim: "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`".

Command: `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`

```
● … › returns a missing required property to the caller as a ToolResponse and never runs the executor
    -   "names": true,
    -   "says": true,
    +   "names": false,
    +   "says": false,

● … › names the path and expected type of a wrong-typed property without echoing any input value
    -   "echoesValue": false,
    -   "executorCalls": 0,
    +   "echoesValue": true,
    +   "executorCalls": 1,
    -   "namesPath": true,
    -   "namesType": true,
    +   "namesPath": false,
    +   "namesType": false,

● … › throws at register time, naming the tool, for a schema that cannot compile
    Expected pattern: /broken_tool/
    Received function did not throw

● … › validates a function-valued definition against the schema it returns at that call, not a cached one
    -   "executorCalls": 1,
    -   "namesCity": true,
    +   "executorCalls": 2,
    +   "namesCity": false,

● … › lets the model read a rejection and retry within the tool loop, passing the corrected input through unchanged
    +     Object {},
    -   "rejectionVisibleNextRound": true,
    +   "rejectionVisibleNextRound": false,

Tests:       5 failed, 5 total
```

In every case the executor runs on input the schema should reject, nothing is rejected, and `register` accepts a schema that can't compile.

Three spec statements are still uncited on purpose: "compiled once, not recompiled", "`Unknown tool:` still throws", and "required, types and enum only". The DoD's facets give those to the implementing round's own `registry.test.ts`, which the ticket asks for by name.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}