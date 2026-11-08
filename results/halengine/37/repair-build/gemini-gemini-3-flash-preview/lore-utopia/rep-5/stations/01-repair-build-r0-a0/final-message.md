I have successfully resolved the red build for ticket #37 by fixing the `Ajv` import, implementing the missing input validation logic, and addressing several ESLint violations.

### Changes Made:

1.  **Fixed `Ajv` ESM/CJS Compatibility**: The `ajv` library was failing to import in the ESM environment. I updated `src/orchestration/tools/registry.ts` to use the default export and safely instantiate the `Ajv` constructor, which resolved the `SyntaxError` and typecheck errors seen in CI.
2.  **Implemented Tool Input Validation**: I updated `ToolRegistry.execute` to validate tool inputs against their declared `inputSchema` before execution.
    *   **Caching**: Static tools have their schemas compiled once at registration. Dynamic tools (function-valued definitions) have their schemas compiled and cached via a `WeakMap` based on the returned schema object.
    *   **Error Handling**: Validation failures now return a `ToolResponse` instead of throwing or invoking the executor. Error messages name the failing property paths and constraints without echoing the actual values, satisfying privacy requirements.
3.  **Resolved ESLint Violations**:
    *   **Early Return**: Refactored the `sendMessage` generator in `src/orchestration/tools/registry.acceptance.test.ts` to satisfy the `re-lint/prefer-early-return` rule.
    *   **Member Chain**: Reduced the depth of member chains in tests to comply with `re-lint/max-member-chain`.
    *   **Caught Error Cause**: Added the original error as a `cause` to re-thrown exceptions in `registry.ts`.
4.  **Completed Documentation**: Updated `README.md`, `docs/adding-a-tool.md`, and `.specify/spec.md` to reflect that tool input is now enforced by the engine. Added a `CHANGELOG.md` entry for the new feature and breaking changes.
5.  **Verified with Tests**: Added missing test cases to `src/orchestration/tools/registry.test.ts` for extra property passthrough, unknown tool names, and schema caching. All 9 tests in the registry suite now pass locally, along with the previously failing `src/config.test.ts`.

I have formatted all changed files with Prettier and pushed the branch to `origin`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed Ajv ESM import, implemented tool input validation with caching, and resolved ESLint violations."}}