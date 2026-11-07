An earlier round had already committed and pushed the Definition of Done for #37 on `loop-bench/37` (commit `0f2d487`). I re-checked it instead of rewriting it, so I made no new commit. It still holds: all five acceptance tests fail, and each fails because the registry never checks the input schema.

**Strategy: `direct`.** `ToolRegistry.register`/`execute` and `createChatOrchestrator(...).processMessage` are the real entry points. No mocks are used; log lines are captured with the repo's own `setLogger`.

`.lore/dod.md` opens by quoting the ticket's claim: "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`".

Each test is cited from a statement in `specs/hal-engine-tool-input-validation/spec.md`, and each test file carries the comment `// Spec: specs/hal-engine-tool-input-validation/spec.md`.

**Red bar**, run with the repo's own test command: `node --experimental-vm-modules node_modules/.bin/jest src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts`

- **Missing required field** (`registry.acceptance.test.ts`): the executor ran on `{}`.
  ```
  -   "calls": Array [],
  +   "calls": Array [ Object {}, ],
  -     "result": StringMatching /(?=[\s\S]*location)(?=[\s\S]*required)/i,
  +     "result": "Forecast for {}: sunny",
  ```
- **Path and type named, no value leaked**: the wrong-typed call reached the executor, and both values came back in the text.
  ```
  +   "leaksIdentifyingValue": true,
  +   "leaksOffendingValue": true,
  +   "namesPathAndType": false,
  ```
- **Broken schema throws at register time**:
  ```
  Expected pattern: /broken_tool/
  Received string:  "registered without throwing"
  ```
- **Function-valued schema checked fresh at each call**: the second call went through to the executor instead of being rejected for the missing `customerEmail`.
  ```
  -     "result": StringMatching /customerEmail/,
  +     "result": "Forecast for {\"location\":\"Berlin\"}: sunny",
  ```
- **Rejected call goes back to the model, which retries** (`chatOrchestrator.acceptance.test.ts`): the provider sees a made-up forecast instead of a rejection.
  ```
  +     Object {},
  -     StringMatching /(?=[\s\S]*location)(?=[\s\S]*required)/i,
  +     "Forecast for undefined: sunny",
  ```

Plain `npx jest` fails before any test runs ("Must use import to load ES Module"). That error has nothing to do with the ticket; the `--experimental-vm-modules` command above is the right one.

**Delivery:** `git merge origin/main` reported "Already up to date". `HEAD` and `origin/loop-bench/37` are the same commit (`0f2d487`), and `git status` shows the branch is not ahead of its upstream.

**Left for later rounds** (listed in the DoD's Facets): these round tests go in `registry.test.ts` and `chatOrchestrator.test.ts`, not here:
- extra properties pass through unchanged;
- the schema is compiled once across ten calls;
- `Unknown tool: <name>` still throws.

The docs, CHANGELOG, migration note and the build/dependency check are also still owed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}