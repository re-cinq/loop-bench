This round fixed the CI typecheck and test failures and added the unknown-tool test. The branch is pushed and not ahead of its upstream. The merge of `origin/main` produced no conflicts.

- **CI fix:** Both CI failures came from `import AjvModule from 'ajv'` plus `AjvModule.default` in `src/orchestration/tools/registry.ts`. I replaced it with the named import `{Ajv}`. That should clear the "Ajv is not a constructor" test errors and the TS2339 errors, though the typecheck wasn't run here. `registry.test.ts` now passes locally (3 of 3).
- **New test:** `registry.test.ts` now pins that `execute` throws `Unknown tool: <name>` for an unregistered name. I linked it from its statement in `specs/hal-engine-tool-input-validation/spec.md`. The repo has no `scripts/spec-links/reanchor.mjs`, so I appended the test at the end to keep the existing `#Lnn` links valid.
- **`.lore/dod.md`:** Updated to record the unknown-tool test as done. The last facet stays unchecked.
- **Red tests:** None were mine and none were regressions. The red tests were the CI failures above, caused by the broken Ajv import.
- **Not run:** I didn't run the acceptance tests, lint or typecheck, per the brief.

Still open for the next round: the compile-once, dynamic-schema and no-leak-log unit tests. After those, the `chatOrchestrator.test.ts` loop test, then the docs/README/`.specify/spec.md`/ADR-002/`example/weather-tool.ts` updates, and flipping the spec status.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair (named Ajv import) and unknown-tool throw pin test","tdd_next":"compile-once, dynamic-schema and no-leak-log unit tests, chatOrchestrator loop test, then docs/README/.specify/ADR-002 updates"}}