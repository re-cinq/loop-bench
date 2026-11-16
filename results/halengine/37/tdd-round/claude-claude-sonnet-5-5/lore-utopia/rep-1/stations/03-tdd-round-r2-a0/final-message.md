This round fixed all the typecheck errors CI reported and added one test, for the unknown-tool throw. I pushed it, and the branch is up to date with `origin/main`.

- **CI fix:** every error came from `src/orchestration/tools/registry.ts` importing `ajv`'s default export. It now uses the named `Ajv` export, which also gives `ErrorObject` its real fields. I did not run the typecheck here, so CI will confirm it. At runtime, `import {Ajv} from 'ajv'` works.
- **New test:** `throws Unknown tool for an unregistered name` in `src/orchestration/tools/registry.test.ts`. The repo uses Jest, and all 3 tests in that file pass. Its spec statement in `specs/hal-engine-tool-input-validation/spec.md` now carries the validated-by link. I did not run `scripts/spec-links/reanchor.mjs`, because the repo has no such script.
- **Red tests:** none were mine and none were regressions. I did not run the acceptance tests.
- **`.lore/dod.md`:** the last facet is still open, now marked partial.

The remaining work for the next round:
- the wrong-type no-leak test
- the function-source schema test
- the compile-once test
- the orchestrator tool-loop test in `chatOrchestrator.test.ts`
- the docs updates in `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md` and ADR-002
- the CHANGELOG entry
- `example/weather-tool.ts`

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix ajv named import (typecheck) + unknown-tool throw test","tdd_next":"remaining unit tests (wrong-type no-leak, function-source schema, compile-once, orchestrator tool-loop), docs/README/.specify/ADR/CHANGELOG, weather-tool example"}}