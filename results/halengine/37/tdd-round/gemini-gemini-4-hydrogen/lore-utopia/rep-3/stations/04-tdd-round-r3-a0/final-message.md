Fixed all CI failures reported on `c411bad` and completed one unit-test facet on `loop-bench/37`:

- **`src/orchestration/tools/registry.ts`**:
  - Removed `SchemaObject` and `Ajv`-namespace type usage, deriving `SchemaCompiler`, `SchemaInput`, and `CompiledValidator` from `InstanceType<typeof Ajv>` and `createSchemaCompiler()` with `Options & {strict?: boolean; validateFormats?: boolean}` so `typecheck` passes under both `ajv@6` (which CI resolved) and `ajv@8` (declared in `package.json`).
  - Normalized error paths from `instancePath ?? dataPath ?? ''` (stripping leading `.` or `/`) and read `error.params` via `Object.entries`, resolving the `ajv@6` runtime `TypeError` on `.slice`.
  - Replaced the dangling/nested `if` chain in `formatValidationError` with a `switch` and a `formatEnumError` helper placed below it to resolve `re-lint/prefer-early-return` and `re-lint/no-nested-if`.
- **`src/orchestration/tools/registry.test.ts` & `specs/hal-engine-tool-input-validation/spec.md` & `.lore/dod.md`**:
  - Added `passes valid input with extra properties through unchanged and rejects invalid enum values` (`src/orchestration/tools/registry.test.ts#L139`), cited it in `specs/hal-engine-tool-input-validation/spec.md`, and updated `.lore/dod.md`.
- **Verification**:
  - `npx prettier --check src/orchestration/tools/registry.ts src/orchestration/tools/registry.test.ts` passed.
  - `node scripts/check-spec-anchor-names.mjs specs/hal-engine-tool-input-validation/spec.md`, `node scripts/check-spec-links.mjs specs/hal-engine-tool-input-validation/spec.md`, and `node scripts/repoint-spec-anchors.mjs --check origin/main` passed.
  - `src/orchestration/tools/registry.test.ts` ran locally: 4 passed, 0 failed. On the previous push (`c411bad`), CI reported 1 red ticket acceptance test (`src/orchestration/tools/registry.acceptance.test.ts`) and 0 regressions.
  - Unrelated smell noticed (not acted on): CI's environment appears to resolve `ajv@6.15.0` (from `eslint`) rather than `ajv@^8.20.0` in `package-lock.json`.
  - Committed (`07eafc2`), pushed to `origin/loop-bench/37`, and confirmed `origin/main` is already up to date with a clean working tree.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix ajv@6/@8 compatibility and re-lint errors in registry.ts, add pass-through and enum unit test in registry.test.ts, and cite it in specs/hal-engine-tool-input-validation/spec.md","tdd_next":"Add remaining unit tests in registry.test.ts and chatOrchestrator.test.ts, link remaining spec statements, update docs and CHANGELOG.md, and set spec status to Implemented"}}