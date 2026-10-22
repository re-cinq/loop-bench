I have fixed the red build for ticket #37 "Validate tool input against the registered inputSchema".

The build failure was caused by an incorrect named import of `Ajv` in an ESM context, which led to both type-check and runtime syntax errors. Additionally, several ESLint rules were violated in the recently added tests and implementation.

**Key Fixes:**
- **ESM Compatibility:** Fixed the `ajv` import in `src/orchestration/tools/registry.ts` to use the default export, resolving the `SyntaxError` and `TS2693` error.
- **Input Validation:** Implemented mandatory input validation in `ToolRegistry.execute`. It now validates model-provided input against the tool's `inputSchema` before execution.
- **Dynamic Schemas & Caching:** Refactored the registry to support function-valued tool definitions. Compiled validators are now cached using a `WeakMap` keyed by the schema object, ensuring that static tools are compiled exactly once while dynamic tools remain correct.
- **Version Compatibility:** Added support for both `instancePath` (Ajv 8+) and `dataPath` (Ajv 6/7) to ensure the registry works correctly regardless of the environment's `ajv` version (the pod currently has 6.15.0 despite the `package.json` specifying `^8.20.0`).
- **ESLint Compliance:** Fixed `re-lint/prefer-early-return` and `re-lint/max-member-chain` violations in `src/orchestration/tools/registry.acceptance.test.ts`.
- **Documentation:** Updated `README.md`, `CHANGELOG.md`, `docs/adding-a-tool.md`, and the system specifications to reflect that tool input is now strictly enforced and rejections are returned to the model as a `tool_result`.

**Verification:**
I ran the relevant test suites (`src/orchestration/tools/registry.test.ts` and `src/orchestration/tools/registry.acceptance.test.ts`) using the project's Jest configuration. All 10 tests passed, confirming:
- Rejection of missing required fields and wrong-typed values.
- Redaction of sensitive input values from logs and error messages.
- Correct handling of dynamic schemas for function-valued tools.
- Single compilation of static schemas (verified via a manual spy).
- Proper recovery in the orchestrator loop when a tool call is rejected.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed Ajv ESM import, implemented input validation with caching, and resolved ESLint violations in tests."}}