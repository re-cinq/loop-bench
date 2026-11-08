In this round, I resolved all CI failures reported in the previous build and completed the remaining documentation tasks for ticket #37.

1. **Fixed CI Failures:**
   - **`registry.ts`**: Fixed TypeScript type errors by refactoring `getDynamicValidator` for better type narrowing and removed unused `ErrorObject` import. Replaced `any` with `ErrorObject` in the validation error mapping.
   - **`chatOrchestrator.test.ts`**: Resolved ESLint violations by refactoring `sendMessage` mock with early returns and guard clauses, and replaced `any` with the explicit `ToolResultContent` type.
   - **`registry.test.ts`**: Fixed the member chain depth error and split a test with multiple `expect` calls into two separate tests.

2. **Updated Documentation and Examples:**
   - **`example/weather-tool.ts`**: Updated to reflect that input is now pre-validated by the registry.
   - **`docs/adding-a-tool.md`**: Updated guidance to explain that executors receive validated input and that rejections are returned to the model.
   - **`README.md` & `.specify/spec.md`**: Updated features and business rules to state that tool input is now enforced against the schema.
   - **`ADR-002`**: Updated status to `partially-adopted` and recorded the AJV implementation.
   - **`CHANGELOG.md`**: Added a detailed entry for the 0.4.0 release.

3. **Traceability:**
   - Manually updated the line number anchors in `specs/hal-engine-tool-input-validation/spec.md` for the tests that shifted due to these changes.

All unit tests passed locally, and the branch has been pushed and merged with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update example/weather-tool.ts, documentation, and CHANGELOG.md","tdd_next":"acceptance green"}}