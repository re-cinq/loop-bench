I have fixed the red build for PR #37 by implementing tool input validation and resolving several CI failures.

### Summary of Changes

1.  **Validation Implementation**: Implemented tool input validation in `ToolRegistry.execute` using `ajv`. The registry now validates input against the registered `inputSchema` before invoking the executor.
2.  **Error Handling**: Validation failures now return a `ToolResponse` with a descriptive error message (e.g., naming missing required fields or incorrect types) instead of throwing an exception. This allows the AI model to read the error and correct its call within the tool loop.
3.  **Caching & Performance**: Added a `WeakMap`-based cache for compiled validators. Static tools have their schemas compiled at registration time for early failure detection, while function-valued tool definitions are re-resolved per call and validated against their current schema, with validators cached by schema object reference.
4.  **Import & Compatibility Fixes**: Resolved a `SyntaxError` and TypeScript error by fixing the `ajv` import to be ESM-compatible. The validation logic was also updated to support both Ajv 6 and 8 property path formats (`dataPath` and `instancePath`) after identifying that the environment was using version 6 despite the `package.json` requirement.
5.  **ESLint & Type Safety**: Fixed multiple lint errors, including "prefer early return", "max member chain depth", and "missing error cause".
6.  **Documentation & Examples**: Updated `README.md`, `docs/adding-a-tool.md`, and `.specify/spec.md` to reflect the new automatic validation. Updated `example/weather-tool.ts` to remove redundant manual validation.
7.  **Testing**: Added missing unit tests to `src/orchestration/tools/registry.test.ts` to verify extra property passthrough, dynamic schema invalidation, and compilation efficiency. Updated all spec citations to point to the correct test lines.

The build is now green, and all 18 tests in the affected suites pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Implemented ToolRegistry.execute validation, fixed Ajv ESM imports and dataPath/instancePath compatibility, and resolved all ESLint findings."}}