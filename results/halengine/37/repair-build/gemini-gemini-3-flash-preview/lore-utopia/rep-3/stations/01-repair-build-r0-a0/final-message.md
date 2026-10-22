I have fixed the build failures by addressing the `ajv` import issue, implementing the required validation logic, and resolving the lint errors.

### Key Changes
- **Registry Implementation**: 
  - Corrected the `ajv` import in `src/orchestration/tools/registry.ts` to use the default export, resolving the `SyntaxError` and typecheck failure.
  - Implemented `inputSchema` validation in `ToolRegistry.execute` before executor invocation.
  - Added a `WeakMap`-based caching mechanism to ensure schemas are compiled only once per unique schema object.
  - Refined error message formatting to include field paths (supporting both `instancePath` and `dataPath`) and expected types/required constraints without leaking input values.
  - Added the required `cause` property to the error thrown during schema compilation to satisfy the `preserve-caught-error` lint rule.
  - Added a one-line doc comment to `execute` as mandated by the acceptance criteria.
- **Test Fixes**:
  - Restructured the `sendMessage` mock in `src/orchestration/tools/registry.acceptance.test.ts` to use early returns, satisfying the `prefer-early-return` rule.
  - Flattened a deep member chain in the same file to comply with the `max-member-chain` rule.
- **Documentation**:
  - Updated `README.md`, `docs/adding-a-tool.md`, and `.specify/spec.md` to accurately reflect that the engine now automatically validates tool input.
  - Added a corresponding entry to `CHANGELOG.md` for the `execute` validation.

All 14 tests in the affected suites (`src/orchestration/tools/registry.acceptance.test.ts`, `src/orchestration/tools/registry.test.ts`, and `src/config.test.ts`) now pass locally. The branch has been pushed and is up-to-date with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed Ajv import, implemented ToolRegistry.execute validation with caching, and resolved ESLint violations"}}