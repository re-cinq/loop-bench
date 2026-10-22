I have fixed the build failures and implemented tool input validation in `ToolRegistry.execute`. 

Summary of changes:
1.  **ESM/CJS Interop Fix**: Changed `ajv` import from a named export to a default export in `src/orchestration/tools/registry.ts` to resolve `SyntaxError` and typecheck errors in the ESM environment.
2.  **Input Validation**: Implemented validation against the tool's `inputSchema` using `ajv` inside `ToolRegistry.execute`. Rejections are returned as a `ToolResponse` result, allowing the AI model to see and correct validation errors within the tool loop.
3.  **Dynamic Schema Support**: Updated `ToolRegistry` to re-resolve function-valued tool definitions on every call. Compiled validators are cached using a `WeakMap` keyed by the schema object, ensuring static schemas are only compiled once while dynamic schemas stay current.
4.  **Security & Redaction**: Ensured that validation failure messages name the failing field paths and constraints but never echo the offending values, protecting sensitive data from logs and model results.
5.  **Tests & Citations**: Created a comprehensive unit test suite in `src/orchestration/tools/registry.test.ts` and added an integration test to `src/orchestration/chatOrchestrator.test.ts`. All new tests include inline citations to the `specs/hal-engine-tool-input-validation/spec.md` as required.
6.  **Documentation**: Updated `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, and `CHANGELOG.md` to reflect that input is now validated before reaching the executor.

Migration Note: Executors no longer need to hand-validate or cast input defensively for `required` fields or types, as only schema-compliant input reaches them. Tools that previously relied on seeing malformed input to generate custom errors will now see those calls rejected by the registry instead.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed ajv import and implemented tool input validation in ToolRegistry.execute with per-call schema resolution and caching"}}