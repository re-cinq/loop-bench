I wrote four acceptance tests for #37. All four are red today, and I pushed them with the spec and `.lore/dod.md`. The branch is up to date with `origin/main` and not ahead of its upstream.

**Strategy: `direct`.** `ToolRegistry.register` and `execute` are real seams, so the tests need no doubles.

**Files:**
- `src/orchestration/tools/registry.acceptance.test.ts` holds the tests.
- `specs/hal-engine-tool-input-validation/spec.md` is new. It states the contract and cites each test, and the citations pass `scripts/check-spec-anchor-names.mjs`.
- `.lore/dod.md` opens with the ticket's claim and has the checklist and strategy.

I ran the file with `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/tools/registry.acceptance.test.ts`. It shows `Tests: 4 failed, 4 total`. Each test fails because nothing validates input:
- **Missing required field:** `execute('weather', {})` still runs the executor (received `calls: 1`, expected 0), and the result doesn't name `location`.
- **Wrong type:** `{location: 918273645}` also reaches the executor (`calls: 1`), and the result doesn't name `location` or `string`.
- **Uncompilable schema:** `Expected pattern: /weather/` but `Received function did not throw`.
- **Function-valued definition:** after the schema changes, the second call isn't rejected for `city` (`rejectedForCity: false`) and the executor ran on both calls (`calls: 2`, expected 1).

The ticket lists more tests than I wrote:
- **Extra-property pass-through:** I dropped it. It passes today, so it can't be red; it's a guard for the implementing round.
- **Compile-once across ten calls:** I left it out because it can't be observed without a spy or a mock.
- **Unknown-tool throw, orchestrator retry loop and no value in log lines:** I left these to the implementing round, which writes `registry.test.ts` and extends `chatOrchestrator.test.ts`. The unknown-tool throw already holds today.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}