The acceptance tests are committed and pushed to `loop-bench/37`, and the branch is in sync with its upstream. The four tests fail, each for the reason the ticket gives.

**Strategy: `direct`.** `ToolRegistry.execute` and `register` already exist and the orchestrator already routes tool calls through `execute`, so every test calls real code.

**Files added:**
- `src/orchestration/tools/registry.acceptance.test.ts` has four tests. The ticket named `registry.test.ts`, but the contract requires the `.acceptance.test.ts` suffix.
- `specs/hal-engine-tool-input-validation/spec.md` is new. The ticket points at this path but it did not exist, so I created it with Status `Draft` and one cited statement per test.
- `.lore/dod.md` quotes the ticket's central claim and lists the tests and facets.

**Run:** `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`

Failure output, trimmed to the assertion lines:

```
● answers a call missing a required property ...
    Expected substring: "location"
    Received string:    "forecast"

● names the property path and expected type for a wrong-typed value ...
    Expected substring: "location"
    Received string:    "forecast"

● fails registration of a tool whose inputSchema cannot be compiled ...
    Expected pattern: /broken_tool/
    Received function did not throw

● hands a rejected tool call back to the model so a corrected retry completes the turn
    Expected substring: "location"
    Received string:    "forecast for Unknown"
```

The first two show `execute` running the executor on malformed input. The third shows `register` accepting a schema with `type: 'nonsense'`. The fourth shows the weather-style executor's `Unknown` fallback reaching the model with no rejection.

**Scope concerns to decide on:**
- **Not every ticket criterion has a red test.** The contract caps a DoD at five tests, and the ticket lists about ten behaviours. I wrote four. Passing these four does not finish the ticket. The function-valued schema re-resolution, the compile-once caching, and the log-redaction checks are listed as facets, not tests. The ticket may need splitting.
- **Two criteria cannot be red.** Extra-property pass-through and the `Unknown tool` throw already behave correctly on `main`, so a test for either would pass today. I left both out and noted them as facets.
- **Docs, CHANGELOG, `package.json`, and PR-body items** are not tests and are not in the DoD. They are facets for the implementation round.

Prettier fixed one formatting issue in `.lore/dod.md` after my first commit, so there are two commits on the branch. I did not run the linter or typechecker here.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}