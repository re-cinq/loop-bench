I've committed and pushed five acceptance tests for #37. All five fail now for the reason the ticket gives: malformed input goes straight to the executor, and `register` accepts a schema that can't be compiled. The branch `loop-bench/37` is up to date with `origin/main` and not ahead of its upstream.

**Strategy: `direct`.** `ToolRegistry.register` and `execute` already work as the place to test. The tests call them with real schemas and an executor that counts its calls, with no mocks. They also run the tool loop through `createChatOrchestrator` with a provider that plays back fixed rounds.

**Files:**
- `src/orchestration/tools/registry.acceptance.test.ts`: the five tests, each marked with its spec anchor.
- `specs/hal-engine-tool-input-validation/spec.md`: a new spec, Status `In Progress`. Five statements link to the tests with `([validated by ...])`. Three more have no link yet: extra properties pass through unchanged, a static schema is compiled once, and an unknown tool name still throws. Those are guards that pass today, so they go to later rounds. `check:spec-links` reports 0 misplaced.
- `.lore/dod.md`: the quoted claim, the strategy, the five tests, the facets and what's out of scope.

**Red bar:** `node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage=false src/orchestration/tools/registry.acceptance.test.ts`
```
● … › returns a result naming the missing required property and never invokes the executor
    Expected pattern: /required[\s\S]*location|location[\s\S]*required/
    Received string:  "forecast for Unknown"
● … › rejects a wrong-typed field by path and expected type without echoing any input value to the result or the log
    Expected pattern: /location[\s\S]*string/
    Received string:  "forecast for 4242017"
● … › throws at register time, naming the tool, when the static schema cannot be compiled
    Expected pattern: /broken_tool/
    Received function did not throw
● … › validates a function-valued definition against the schema current at that call, not a stale one
    Expected pattern: /postcode/
    Received string:  "forecast for Unknown"
● … › resolves processMessage and shows the rejection to the provider on the next round, which then retries
    Received string:  "[…{\"type\":\"tool_result\",\"toolUseId\":\"call-1\",\"content\":\"forecast for Unknown\"}]}]"
Tests:       5 failed, 5 total
```

**What later rounds still owe:**
- **Guard tests.** The ticket asks for some tests that would pass today, so they can't be acceptance tests: extra property passed through exactly once, compiled once across ten calls, and the `Unknown tool` throw. They're listed under Facets in `dod.md`.
- **Two test files the ticket names.** It wants a new `registry.test.ts` and a tool-loop test inside `chatOrchestrator.test.ts`. The contract here doesn't let acceptance tests share files, so I put them in their own file and listed those two as later work too.
- **Everything else in the ticket.** That covers the docs, README, `.specify/spec.md`, CHANGELOG, the MINOR version bump, the migration note and the `ajv` dependency.

I didn't run the linter or the typechecker, per the pod rules; CI will.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}