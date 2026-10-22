I have completed the TDD round for ticket #37, implementing tool input validation in the `ToolRegistry`.

### Changes Made
- **Implementation**: Added `ajv` to `dependencies` and implemented schema validation in `ToolRegistry.execute`. The registry now validates tool arguments against the registered `inputSchema` before execution.
- **Error Handling**: Malformed tool calls now return a `ToolResponse` with the validation error instead of throwing an exception. This allows the `ChatOrchestrator` to feed the error back to the model as a `tool_result`, enabling recovery and retry within the tool loop.
- **Schema Compilation**: Static tool schemas are compiled once at `register` time, while dynamic schemas are compiled on-demand and cached via `WeakMap`.
- **CI Fixes**:
  - Resolved `typecheck` error by removing the unsupported `strict` option for `Ajv` v6.
  - Fixed multiple `eslint` violations in `registry.ts` and `registry.acceptance.test.ts` (early returns, member chains, and declaration proximity).
  - Added missing `cause` to errors thrown during schema compilation.
- **Traceability**: Updated `specs/hal-engine-tool-input-validation/spec.md` with missing validation links and synchronized line numbers for all tests.
- **Documentation**: Updated `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, and `adrs/ADR-002-response-validation.md` to reflect the new validation behavior.
- **Examples**: Updated `example/weather-tool.ts` to remove manual defensive checks, as input is now guaranteed to be schema-valid.
- **Versioning**: Bumped package version to `0.4.0` (MINOR) and updated `CHANGELOG.md`.

### Verification Results
- **Unit Tests**: Added comprehensive unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts`. All 25 tests in these suites passed locally.
- **Acceptance Tests**: The existing acceptance tests in `src/orchestration/tools/registry.acceptance.test.ts` were used as the "red" signal from CI and are expected to be green on the next CI run.
- **Formatting**: All modified files were formatted using `prettier`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input in ToolRegistry.execute before invoking the executor","tdd_next":"acceptance green"}}