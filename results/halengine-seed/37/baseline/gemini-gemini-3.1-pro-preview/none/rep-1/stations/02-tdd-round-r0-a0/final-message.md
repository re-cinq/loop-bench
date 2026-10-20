Completed one red-green-refactor round:

- Added `ajv` to `package.json` `dependencies` (and synced `package-lock.json`).
- Added a unit test in `src/orchestration/tools/registry.test.ts` verifying that `ToolRegistry.register` throws at registration time with the tool's name when given an uncompilable `inputSchema`, and implemented `compileSchema` in `ToolRegistry.register`.
- Linked the test in `specs/hal-engine-tool-input-validation/spec.md`, updated `CHANGELOG.md`, and ticked the completed facets in `.lore/dod.md`.
- Red tests: 0 of mine (1 green), 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Configure ajv inside ToolRegistry, add ajv to package.json dependencies, and compile schemas in register","tdd_next":"Evaluate input against compiled schema in execute early exit with ToolResponse"}}