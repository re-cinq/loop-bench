I have completed the TDD round for the schema compilation facet of ticket #37.

**Summary of changes:**
1.  **Red Phase:** Created `src/orchestration/tools/registry.test.ts` with a test verifying that `ToolRegistry.register` throws an error when provided with an invalid JSON schema.
2.  **Green Phase:**
    *   Added `ajv` to `package.json` and `package-lock.json`.
    *   Bumped the project version to `0.4.0`.
    *   Implemented `Ajv` compilation in `ToolRegistry.register` for static tools.
    *   Implemented a `WeakMap` cache in `ToolRegistry` to store compiled validators for both static and dynamic tools.
    *   Added a mandatory one-line doc comment to `ToolRegistry.execute` pointing to the spec.
3.  **Refactor/Verification:**
    *   Verified the new test passes.
    *   Updated `specs/hal-engine-tool-input-validation/spec.md` with a link to the new unit test.
    *   Updated `CHANGELOG.md` with an entry for the new validation logic.
    *   Updated `.lore/dod.md` to mark the completed facets.
    *   Formatted changed files and ran the reanchor script.

The changes have been committed and pushed to the branch `loop-bench/37`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static ToolDefinition.inputSchema at ToolRegistry.register time and cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference (WeakMap)","tdd_next":"Validate input in ToolRegistry.execute before invoking the executor, returning a ToolResponse ({result}) that names failing field paths and expected types/required fields"}}