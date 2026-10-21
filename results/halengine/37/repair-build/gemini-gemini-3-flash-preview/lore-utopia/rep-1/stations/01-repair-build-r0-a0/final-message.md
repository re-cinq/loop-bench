I have resolved the red build for HALEngine ticket #37, "Validate tool input against the registered inputSchema".

The build failure was caused by a combination of issues:
1.  **Ajv Import Issue:** The project uses ESM and `NodeNext` resolution, but `ajv` in this environment only provides a `default` export. I corrected the import from `import {Ajv} from 'ajv'` to `import Ajv from 'ajv'`.
2.  **ESLint Violations:** Addressed `re-lint/prefer-early-return` and `re-lint/max-member-chain` in the acceptance tests, and `preserve-caught-error` in `registry.ts`.
3.  **Missing Implementation:** Implemented the core validation logic in `ToolRegistry.execute`. Tool inputs are now validated against their registered `inputSchema` using `ajv`.
4.  **Schema Caching:** Added a `WeakMap`-based cache to ensure that static tool schemas are compiled only once, and function-valued tool definitions are efficiently validated using cached compiled schemas when they return the same schema object.
5.  **Error Redaction:** Ensured that validation error messages and log lines include property paths and failing constraints but never the offending property values themselves.
6.  **Tool Loop Recovery:** Verified that a schema rejection returns a `ToolResponse` instead of throwing, allowing the orchestrator to feed the error back to the model for a corrected retry.

I also updated the comprehensive documentation suite (`README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, and `specs/hal-engine-tool-input-validation/spec.md`) and examples (`example/server.ts`, `example/weather-tool.ts`) to reflect the new validation behavior and remove outdated advice about defensive casting.

Finally, I added a full suite of unit tests in `src/orchestration/tools/registry.test.ts` and ensured the orchestrator-level recovery test was correctly placed and cited in `src/orchestration/chatOrchestrator.test.ts`. All 34 tests in the affected suites are passing.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Implemented ToolRegistry input validation with Ajv, fixed ESM imports and ESLint violations, and updated all documentation."}}