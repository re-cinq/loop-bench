The branch is pushed with four acceptance tests, all red for the right reason. `git status` reports the branch in sync with `origin/loop-bench/37`, and the merge with `origin/main` was clean.

**Strategy: `direct`.** `ToolRegistry.register` and `execute` are already the public entry points, so the tests call them with real values and no mocks.

Files added:
- `src/orchestration/tools/registry.acceptance.test.ts`: the four tests.
- `specs/hal-engine-tool-input-validation/spec.md`: the statements the tests cite. This spec is new, since the ticket names it but it did not exist. Status is In Progress, which the citation coverage supports.
- `.lore/dod.md`: the DoD, with the ticket's central claim quoted verbatim.

**Red bar** (Jest on the new file, output as run):
```
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● refuses a call missing a required property without running the executor
    Expected pattern: /location/
    Received string:  "forecast"
  ● refuses a wrong-typed property, naming its path and expected type but not its value
    Expected pattern: /location/
    Received string:  "forecast"
  ● throws at register time for a schema that cannot be compiled, naming the tool
    Received function did not throw
  ● validates a function-valued definition against the schema resolved for that call
    Expected pattern: /location/
    Received string:  "ok"
Tests: 4 failed, 4 total
```
Each failure is the missing behaviour: the executor runs on malformed input, and `register` accepts a broken schema. None fails on an import or fixture problem.

**Choices I made:**
- The ticket names `registry.test.ts`, but the contract requires the `.acceptance.test.ts` suffix, so I used that.
- I left out the pass-through test (extra property reaches the executor unchanged). It passes on today's code, so it cannot be red, and the contract forbids a green acceptance test. It is listed as a facet for the implementing round.
- The chat-loop test, compile-once, redaction, docs, changelog and the build/dependency checks are facets, not acceptance tests. Compile-once would need a spy, and the chat-loop test needs a provider double, which the no-mocks rule rules out here. The ticket is large, so the implementing round should take the facets in order rather than treat four tests as the whole of it.
- Lint and typecheck were not run here, per the pod rules. Prettier was run on the test file, and it was already formatted.

**CI runs the tests** in the "Verify" job's "Test (with coverage floor)" step, which runs `npm run test:coverage`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}