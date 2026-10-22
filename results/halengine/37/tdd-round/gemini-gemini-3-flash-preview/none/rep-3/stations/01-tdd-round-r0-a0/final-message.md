I have completed the first TDD round for ticket #37, focusing on the infrastructure and initial implementation of tool input validation.

### Changes Made
- **Dependency Management:** Added `ajv` to `package.json` and `package-lock.json` and bumped the package version to `0.4.0` (MINOR bump).
- **Core Implementation:**
  - Modified `ToolRegistry` in `src/orchestration/tools/registry.ts` to include an `Ajv` instance configured for strict-less validation as per requirements.
  - Implemented static schema compilation in `ToolRegistry.register`. The method now compiles the `inputSchema` immediately and throws a descriptive error naming the tool if the schema is invalid.
  - Added a `WeakMap` to the registry for future caching of validators for dynamic tool definitions.
- **Testing:**
  - Created `src/orchestration/tools/registry.test.ts` with a unit test that verifies `register` throws when given an invalid JSON Schema.
  - Verified that the new test passes and correctly identifies the failing tool.
- **Traceability and Documentation:**
  - Updated `specs/hal-engine-tool-input-validation/spec.md` to link the static compilation requirement to the new unit test.
  - Used `scripts/check-spec-anchor-names.mjs` to ensure the spec citation is correctly anchored to the test name and line.
  - Added a section to `CHANGELOG.md` for version `0.4.0` documenting the new validation capability.
- **Process:** Updated `.lore/dod.md` to mark the first two facets as completed.

### Verification Results
- `src/orchestration/tools/registry.test.ts`: 1 passed, 1 total.
- `check-spec-anchor-names`: 1 citation repointed, 399 citations verified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"static schema compilation in register","tdd_next":"input validation in execute"}}