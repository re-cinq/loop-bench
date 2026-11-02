The acceptance tests for #37 were already on this branch from an earlier round (`5d35ccd`). I checked them, ran them, and fixed one false claim in `.lore/dod.md`. I did not change the tests or the spec. The branch is pushed and not ahead of its upstream. `origin/main` had no new commits, so no merge was needed.

**Strategy: `direct`.** `ToolRegistry.execute` and `register` are already the real entry points, so the tests call them today.

**Red bar, run in this pod:**

```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts
```

```
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ... › rejects input missing a required property before the executor runs
    Expected substring: "location"
    Received string:    "forecast"
  ● ... › rejects a wrong-typed field naming its path and expected type, never echoing the value
    Expected substring: "location"
    Received string:    "forecast"
  ● ... › throws at register time for an uncompilable schema, naming the tool
    Expected pattern: /broken_tool/
    Received function did not throw
  ● ... › validates a function-valued definition against the schema current at each call
    Expected substring: "location"
    Received string:    "forecast"

Tests:       4 failed, 4 total
```

Each failure is the missing behaviour the ticket describes. The executor runs on input the schema should reject, and an uncompilable schema is not caught at `register`. None is a typo, import, or fixture problem.

**What changed:** the `dod.md` on this branch said "this pod ran the failing output below", but nothing followed it. It also named a CI job "Test". I replaced that paragraph with the actual run and the real CI job, "Verify", step "Test (with coverage floor)", which runs `npm run test:coverage`. Commit `2129949`.

**Not covered by the four red tests (left as facets in `dod.md`):**
- Extra-property pass-through, the unknown-tool throw, log and payload redaction, and the `chatOrchestrator` tool-loop test. Each passes or is vacuous today, so none is a red bar. They are the ticket's remaining acceptance items and need their own rounds.
- The ticket asks for four to five more tests than the DoD has, and the spec's un-linked statements cover some of them. Splitting the ticket is a human decision, so I'm flagging it rather than making it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}