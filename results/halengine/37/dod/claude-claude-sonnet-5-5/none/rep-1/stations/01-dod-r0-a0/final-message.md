I committed and pushed five acceptance tests for #37 (strategy `direct`), and all five fail today for the reason the ticket gives. They are in `src/orchestration/tools/registry.acceptance.test.ts`. I ran only that file; `origin/main` was already merged, and the branch is level with its upstream.

I also added `specs/hal-engine-tool-input-validation/spec.md` (status Draft) with five statements, each linked to its test. `.lore/dod.md` opens with the ticket's claim, quoted: "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`".

Run with `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`:

```
Tests: 5 failed, 5 total
```

These are the failures, by test:
- **Missing required property:** `Expected substring: "location"`, `Received string: "ok"`. Today the executor runs and returns "ok".
- **Extra property passes through:** the first call, which omits `location`, is not rejected, so the test fails there.
- **Wrong-typed field:** `Expected length: 0`, `Received array: [{"location": 8675309}]`. The executor is called with the bad input.
- **Uncompilable schema:** `Received function did not throw`.
- **Function-valued definition:** `Expected substring: "city"`, `Received string: "ok"`.

The extra-property test passed on its own at first, so I made it also call `execute` once with a missing `location` and expect a rejection. That keeps it red until validation exists, but it now checks two things at once.

I did not write several tests the ticket lists, and the DoD says the implementing round owes them:
- Compiling a static schema once across ten `execute` calls.
- The tool-loop retry test in `chatOrchestrator.test.ts`.
- The `Unknown tool` throw.

The DoD checks the no-leak requirement for log lines only on the wrong-typed-field test, not on the missing-property test. The doc, README and CHANGELOG edits are also left to that round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}