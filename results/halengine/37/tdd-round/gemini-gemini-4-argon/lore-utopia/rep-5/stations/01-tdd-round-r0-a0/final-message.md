Completed one TDD round:

- **Red:** Added unit test `returns a ToolResponse naming the missing required field and does not invoke the executor` in `src/orchestration/tools/registry.test.ts` and linked it in `specs/hal-engine-tool-input-validation/spec.md`.
- **Green:** Added `ajv` (`^8.20.0`) to `dependencies`, bumped the package version `MINOR` (`0.3.0` -> `0.4.0`), added the `CHANGELOG.md` entry, and implemented `Ajv` validation (`strict: false`, `validateFormats: false`, `allErrors: true`) in `ToolRegistry.execute`.
- **Red tests / Regressions:** 0 regressions; 0 existing tests covered `src/orchestration/tools/registry.ts` on `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ajv to dependencies in package.json and package-lock.json (strict: false, validateFormats: false, no coercion, no defaults, no injected additionalProperties: false) and bump the package version MINOR.","tdd_next":"Compile static ToolDefinition.inputSchema at ToolRegistry.register time (throwing an error naming the tool on invalid schemas) and cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference (WeakMap)."}}