I fixed the red build by addressing the `ajv` import issues, implementing the required validation logic, and resolving lint errors.

### Key Changes:
- **Registry Fixes**: 
    - Fixed the `Ajv` import in `src/orchestration/tools/registry.ts` to use a default import compatible with ESM and the project's environment.
    - Implemented a `WeakMap`-based validator cache in `ToolRegistry` to ensure static schemas are compiled once and function-valued definitions are re-compiled only when the schema object changes.
    - Added comprehensive input validation in `execute()` before the executor is called.
    - Ensured rejection messages and logs name failing paths and constraints but never the property values, as required for security.
- **Lint & Type Safety**:
    - Resolved `re-lint/prefer-early-return` and `re-lint/max-member-chain` in `registry.acceptance.test.ts`.
    - Fixed `preserve-caught-error` by adding the `cause` to the re-thrown error in `registry.ts`.
    - Added a one-line doc comment to `execute()` to satisfy lint rules.
- **Tests**:
    - Expanded `src/orchestration/tools/registry.test.ts` with tests for extra property passthrough, dynamic schema re-validation, and caching behavior.
    - All 9 tests in the registry suite now pass.
- **Documentation**:
    - Updated `README.md`, `docs/adding-a-tool.md`, and `.specify/spec.md` to reflect that input is now validated before reaching the tool executor.
    - Updated the validation spec with links to the new verification tests.
    - Added a minor version entry to `CHANGELOG.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed ajv ESM import, implemented tool input validation with caching, and resolved lint errors."}}