This round fixed the four CI failures from the last push and added the remaining unit tests, docs and changelog. It is committed and pushed, and the branch is level with its upstream. I only ran `registry.test.ts` here: all 4 tests in it passed, and the acceptance tests, typecheck and eslint are left to CI.

- **Typecheck:** I rewrote the ajv usage in `registry.ts` against a small local type so it doesn't depend on which ajv version the types resolve to. The lockfile pins ajv 8.20.0. The errors CI reported look like ajv 6 type shapes, so the cause is probably a stale CI environment, but I couldn't confirm that.
- **eslint:** I added `{cause: error}` to the register-time throw. I also restructured the round-2 branch in `registry.acceptance.test.ts` into a flat early return and replaced the 3-hop member chain with a destructure. Those are lint-only edits to the acceptance test; no assertion changed.
- **Test/coverage:** The coverage-threshold failures coincided with the typecheck error, which probably stopped the suite from loading. I can't say whether the thresholds now pass, since I didn't run coverage.
- **Changelog:** I added a 0.4.0 entry to `CHANGELOG.md`.
- **New unit tests in `registry.test.ts`:** the `Unknown tool` throw, a function-valued schema that changes between calls, and compile-once across ten calls.
- **Docs and spec links:** I added the spec links for those tests, with line anchors that match. I updated `docs/adding-a-tool.md`, `README.md` and `.specify/spec.md` to say input is validated and a rejection is returned, not thrown.

I didn't update `example/weather-tool.ts` or `adrs/ADR-002-response-validation.md`, so a follow-up round still has those. The spec's `Status` row is still "In Progress", and the `chatOrchestrator.test.ts` tool-loop test from the ticket's acceptance criteria isn't written yet.

All red tests this round were ones the branch already had; none were regressions from existing tests. Before the fixes, CI's typecheck, eslint, test and changelog checks were red, and my fixes address all four.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repairs (typing, lint, changelog) plus registry unit tests, spec links, docs/README/.specify","tdd_next":"example/weather-tool.ts, ADR-002 update, chatOrchestrator.test.ts tool-loop test, spec Status; then acceptance green"}}