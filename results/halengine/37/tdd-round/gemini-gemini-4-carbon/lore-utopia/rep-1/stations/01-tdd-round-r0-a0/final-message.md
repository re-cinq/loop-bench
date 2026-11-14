Completed one red-green-refactor round on `loop-bench/37` (`11c0e54`):

- Added a failing unit test in `src/orchestration/tools/registry.test.ts` (`throws synchronously at register time naming the tool when a static schema is invalid`) and linked it in `specs/hal-engine-tool-input-validation/spec.md`.
- Bumped `@re-cinq/hal-engine` version `MINOR` (`0.3.0` -> `0.4.0`), added `ajv` (`^8.20.0`) to `dependencies`, and compiled static `ToolDefinition.inputSchema` at `ToolRegistry.register` time (`strict: false`, `validateFormats: false`, `allErrors: true`), throwing an error naming the tool on invalid schemas.
- Verified `src/orchestration/tools/registry.test.ts` passes (0 red tests of ours, 0 regressions).
- Unrelated smells noticed and left untouched: pre-existing transitive `npm audit` advisories (`body-parser`, `brace-expansion`, `handlebars`, `proxy-addr`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ajv dependency, bump package version MINOR, and compile static ToolDefinition.inputSchema at ToolRegistry.register time","tdd_next":"Validate input in ToolRegistry.execute (with WeakMap validator caching for function-valued schemas) and return a non-leaking rejection ToolResponse before invoking the executor"}}