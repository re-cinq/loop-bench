I committed and pushed four red acceptance tests in `src/orchestration/tools/registry.acceptance.test.ts`. The strategy is `direct`. All four fail for the reason the ticket gives: `execute` never checks `inputSchema`. I ran only that file (jest with `--experimental-vm-modules`), and the branch is not ahead of its upstream.

The `.lore/dod.md` claim quotes the ticket: "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`". I also added `specs/hal-engine-tool-input-validation/spec.md`, which cites each test with a `#Lnn` anchor.

Result: `Tests: 4 failed, 4 total`. The failure for each test:
- **Missing required property:** the executor ran once and the result didn't name `location`. Received `{calls: 1, result: false}`, expected `{calls: 0, result: true}`.
- **Wrong-typed field:** the executor ran and the result named neither the path nor the type. Received `{calls: 1, namesPathAndType: false}`.
- **Uncompilable schema:** `Expected pattern: /weather/ — Received function did not throw`.
- **Function-valued definition with a changing schema:** the executor was called once more than expected, because the second schema was never applied to the first call.

I left some acceptance criteria out of the tests:
- **Extra-property passthrough:** this already passes today, so it can't be red. I dropped it from the tests and listed it under Facets as a guard for the implementing round.
- **Unknown tool still throws:** same reason, already passes.
- **Compile-once across ten `execute` calls:** this can't be observed without spying on ajv, which would be a double.
- **Orchestrator retry-loop test in `chatOrchestrator.test.ts`:** the ticket asks for it in that existing file. I left it for the implementing round rather than append to an existing test file.
- **Docs, README, CHANGELOG, `package.json` dependency and the one-line `execute` comment:** these are doc and packaging items, not behaviour a test can observe.

One thing to watch: the wrong-typed-field test spies on `console.log` via `@jest/globals`, to capture log lines for the "no value in any log line" check.

I did not run prettier on the spec until after writing it, and I did not run lint or typecheck, per the instructions. The spec's `#Lnn` anchors were written by hand, since `scripts/spec-links/reanchor.mjs` doesn't exist in this repo.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}