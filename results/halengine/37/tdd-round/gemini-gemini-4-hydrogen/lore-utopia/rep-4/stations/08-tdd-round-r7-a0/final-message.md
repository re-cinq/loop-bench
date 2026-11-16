Fixed the CI failure reported on `bad4955` in `src/orchestration/tools/registry.test.ts:246` (1 red test from this branch, 0 regressions).

- Updated `src/orchestration/tools/registry.ts` to construct the Ajv validator via `createAjv()`, which probes whether `validateFormats: false` disabled format checks and falls back to `new Ajv({format: false})` when running against Ajv v6 (without triggering Ajv v8's unsupported-option warning).
- Updated `specs/hal-engine-tool-input-validation/spec.md` to document both `validateFormats: false` and `format: false`, formatted with Prettier, ran `src/orchestration/tools/registry.test.ts` (8/8 passed), committed (`4cbe34f`), pushed to `origin/loop-bench/37`, and verified `origin/main` is up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Disable Ajv format validation under both v6 (format: false) and v8 (validateFormats: false) in src/orchestration/tools/registry.ts","tdd_next":"acceptance green"}}