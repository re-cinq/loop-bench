I wrote five acceptance tests for #37. All five fail now for the reason the ticket gives, and they are committed and pushed to `loop-bench/37`. The branch was already up to date with `origin/main`, and `git status` shows it is not ahead of its upstream.

**Strategy: `direct`.** The tests call `ToolRegistry.register`/`execute` and the orchestrator's `processMessage` directly, with real tools and a scripted provider. Nothing is mocked.

**Ticket's claim (quoted at the top of `.lore/dod.md`):**
> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**What I committed:**
- `src/orchestration/tools/registry.acceptance.test.ts` — the five tests.
- `specs/hal-engine-tool-input-validation/spec.md` — a new spec, status `Draft`. Each statement links to its test with `([validated by: <name>](…#Lnn))`, and `check-spec-anchor-names` confirms all 5 links point at the right tests.
- `.lore/dod.md` — the triage, checklist and out-of-scope list for the next round.

**Failure output** from `NODE_OPTIONS=--experimental-vm-modules npx jest --coverage=false src/orchestration/tools/registry.acceptance.test.ts`:
```
● returns a rejection naming the missing required property and never runs the executor
-   "executorCalls": 0,
-   "result": StringMatching /location[\s\S]*required|required[\s\S]*location/,
+   "executorCalls": 1,
+   "result": "Forecast for undefined: sunny",

● names the failing path and expected type but never the offending value, in the result or the logs
-   "executorCalls": 0,
-   "leaked": Array [],
-   "result": StringMatching /location[\s\S]*string/,
+   "executorCalls": 1,
+   "leaked": Array [ "Forecast for 4815162342: sunny" ],
+   "result": "Forecast for 4815162342: sunny",

● throws at register time for an uncompilable schema, naming the tool
    Expected pattern: /broken_tool/
    Received function did not throw

● validates a function-valued definition against the schema current at each call, not a stale one
-   "executorCalls": 1,
-   "second": StringMatching /\bb\b/,
+   "executorCalls": 2,
+   "second": "Forecast for undefined: sunny",

● resolves, shows the rejection to the provider on the next round, and runs the corrected retry
    "executorCalls": Array [
+     Object {},
      Object { "location": "Oslo" },
-   "rejectionSeen": StringMatching /location[\s\S]*required|required[\s\S]*location/,
+   "rejectionSeen": "Forecast for undefined: sunny",
    "reply": "It is sunny in Oslo.",
```

**Ticket criteria I left out of the acceptance tests:**
- **Already true today, so they can't fail first:** "an extra property is passed through unchanged" and "`Unknown tool` still throws". The implementing round should add these as its own tests to guard against regressions.
- **Would need a spy on the validator:** "compiled once across ten calls". That breaks the no-mocks rule.
- **Docs, changelog, `package.json`, PR body and lint:** these are checked by review and CI, not by tests.

All of these are listed under Facets in `.lore/dod.md`.

**Things the next round should know:**
- I used `registry.acceptance.test.ts` instead of the `registry.test.ts` the ticket names, so that file is still free for the next round's own tests.
- `ajv` already shows up in `node_modules`, but only as an indirect dependency. It still has to be added to `dependencies`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}