Completed one TDD round:

- Added `ajv` (`^6.15.0`) to runtime `dependencies` in `package.json` and `package-lock.json`.
- Updated `ToolRegistry.register` in `src/orchestration/tools/registry.ts` to compile static `ToolDefinition.inputSchema` at registration time (throwing an error naming the tool on invalid schemas) and set up `WeakMap`-based validator caching by schema reference.
- Added unit tests in `src/orchestration/tools/registry.test.ts` with corresponding `[validated by: ...]` citations in `specs/hal-engine-tool-input-validation/spec.md`, updated `CHANGELOG.md`, and ticked the completed facets in `.lore/dod.md`.
- Red tests: 0 of mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static ToolDefinition.inputSchema at ToolRegistry.register time with ajv and cache compiled validators by schema object reference","tdd_next":"Validate input in ToolRegistry.execute before invoking the executor, returning a ToolResponse naming failing field paths and expected types/required fields without echoing or logging offending values"}}