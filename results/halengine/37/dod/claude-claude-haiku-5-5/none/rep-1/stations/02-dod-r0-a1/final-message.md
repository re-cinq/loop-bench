The acceptance tests for #37 were already on the branch from an earlier round. I checked them, ran them, and corrected `.lore/dod.md`. Nothing was changed in production code, and the branch is pushed and up to date with its upstream.

**Red bar** (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`, run in this pod):

```
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input validation › rejects a call missing a required property and never runs the executor
    Expected substring: "location"
    Received string:    "forecast"
  ● ToolRegistry input validation › rejects a wrong-typed field with its path and expected type, never the offending value
    Expected substring: "location"
    Received string:    "forecast"
  ● ToolRegistry input validation › refuses a schema that cannot be compiled at register time, naming the tool
    expect(received).toThrow(expected)
    Expected pattern: /broken_tool/
    Received function did not throw
Tests:       3 failed, 3 total
```

Each failure matches the ticket's claim. The executor runs on input the schema rejects, and `register` accepts an uncompilable schema. Nothing fails because of an import or fixture problem.

**Changes this round**
- `.lore/dod.md`: removed a paragraph that said this pod cannot run the tests and that CI must show the red bar. That was wrong, since jest runs here. The paragraph also named a CI job that does not match the workflow (the test step is `npm run test:coverage` in the `Verify` job).
- The test file is already prettier-clean.
- Commit `0fe30d3` (`test(tools): correct dod to show red bar locally`) is pushed. `origin/main` had no new commits, so no merge was needed.

**Strategy: `direct`.** `ToolRegistry.register` and `execute` are real entry points, so the tests call them directly.

**Scope.** The DoD covers the ticket's central claim with three tests: required-property rejection, wrong-type rejection without the value, and register-time compile failure. The other acceptance criteria are listed as facets in `dod.md`, not as tests. These include the chat-orchestrator retry loop, the per-call schema cache, log redaction, and the `Unknown tool` pin. The spec also lacks statements for the rejection-as-result contract, the round bound, and extra-property pass-through, so those would need spec lines before tests can cite them.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}