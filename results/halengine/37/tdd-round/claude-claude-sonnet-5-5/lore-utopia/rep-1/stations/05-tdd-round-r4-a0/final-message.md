This round fixed the two typecheck errors CI reported on the last push and pushed the fix. I didn't run the typecheck here (it OOMs the pod), so CI will confirm it. `registry.test.ts` passes locally, 3 of 3. The branch is merged with `origin/main` and not ahead of its upstream.

- **Cause:** CI's `ajv` typings don't match the local ajv 8.20 ones. The `.default` error and the missing `instancePath` on `ErrorObject` are what ajv 6's typings would produce.
- **Fix:** `src/orchestration/tools/registry.ts` now declares its own small `ErrorObject`, `ValidateFunction` and Ajv constructor types instead of importing them from `ajv`. It reads the path from `instancePath` or, failing that, `dataPath`.
- **Test counts:** no red tests of mine and no regressions. The `.lore/dod.md` acceptance tests were not run, as instructed.
- **Still open:** the remaining unit tests, which are the wrong-type no-leak test, function-source schema, compile-once and the orchestrator tool-loop test. The docs, CHANGELOG and spec links are also still to do. I updated the `.lore/dod.md` facet note to say so.

I didn't act on any unrelated smells.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI typecheck failures by typing Ajv locally in registry.ts","tdd_next":"remaining unit tests (wrong-type no-leak, function-source schema, compile-once, orchestrator tool-loop) then docs/CHANGELOG/spec links"}}