This round added two registry tests: a static tool's schema is compiled once across ten `execute` calls, and an unregistered name throws `Unknown tool: <name>`. `registry.test.ts` passes (4 of 4), and the branch is pushed and up to date with `origin/main`.

I couldn't read CI's verdict on the previous push. `lore_get_ci_failures` returned 404 for `loop-bench/37`, and the brief only showed a coverage table with the failure truncated. I didn't diagnose the red `test` job and ran no acceptance tests. Counts of red tests are unknown: none of mine failed locally, and I can't say whether any regression was involved.

`registry.test.ts` used `jest` without importing it, so I imported it from `@jest/globals`, as `vertexProvider.test.ts` does. I also linked both new tests to their statements in `specs/hal-engine-tool-input-validation/spec.md`. I corrected the `#Lnn` anchors by hand, since there is no `reanchor.mjs` in this repo.

Still open in `.lore/dod.md`:
- The `chatOrchestrator.test.ts` loop test (rejected call, then corrected retry).
- The wrong-type and register-throws tests. The acceptance file may already cover these; I didn't check.
- A test that a rejected payload leaves no identifying value in the logs.
- The doc updates: `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, ADR-002, `example/weather-tool.ts` and `CHANGELOG.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"registry.test.ts compile-once and unknown-tool tests, spec links","tdd_next":"chatOrchestrator.test.ts rejected-then-corrected loop test, then docs/README/.specify/ADR/example/CHANGELOG"}}