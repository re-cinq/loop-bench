I have completed the TDD round for ticket #37, focusing on the registration-time schema compilation facet.

### Research & Strategy
I analyzed the `ToolRegistry` implementation and identified that it was missing `ajv` dependency and schema validation. I selected the "throws at register time" facet as the first testable goal, which directly moves one of the acceptance tests closer to green.

### Execution
1.  **Red Phase**: Created `src/orchestration/tools/registry.test.ts` with a test case that expects `ToolRegistry.register` to throw an error when provided with an invalid JSON Schema. The test failed as expected.
2.  **Green Phase**:
    *   Added `ajv` to `dependencies` in `package.json` and bumped the package version to `0.4.0` using `npm install`.
    *   Updated `ToolRegistry` to initialize `Ajv` and compile `inputSchema` during `register`.
    *   Implemented a `WeakMap` cache to store compiled validators for both static and function-valued tool definitions.
    *   The unit test passed successfully.
3.  **Refactor Phase**:
    *   Updated `specs/hal-engine-tool-input-validation/spec.md` to include a traceability link to the new unit test.
    *   Updated `.lore/dod.md` to tick the completed facets (adding `ajv` and implementing registration-time compilation).
    *   Formatted changed files with Prettier.

### Verification
I verified the changes by running the new unit test:
`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.test.ts`
The test passed, confirming that `ToolRegistry` now correctly validates schemas at registration time.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static inputSchema at register time","tdd_next":"Validate input in ToolRegistry.execute"}}