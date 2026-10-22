Completed one red-green-refactor round:

- Added `ajv` (`^6.15.0`) to `dependencies` in `package.json` and `package-lock.json` and bumped the package version to `0.4.0`.
- Added unit tests in `src/orchestration/tools/registry.test.ts` covering synchronous compilation errors naming the tool at `register` time, single-compile reuse for static `ToolDefinition.inputSchema`, and `WeakMap`-cached compilation by schema object reference for function-valued `ToolDefinitionSource` definitions.
- Implemented `Ajv` (`strict: false, validateFormats: false, allErrors: true`) compilation at `ToolRegistry.register` time and `WeakMap` validator caching in `src/orchestration/tools/registry.ts`, linked the corresponding statements in `specs/hal-engine-tool-input-validation/spec.md`, and updated `.lore/dod.md`.
- Red tests at start of round: 0 regressions, 1 new failing unit test suite written and turned green this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ajv to dependencies and compile static ToolDefinition.inputSchema at ToolRegistry.register time with WeakMap caching for function-valued ToolDefinitionSource schemas","tdd_next":"Validate input in ToolRegistry.execute before invoking the executor, returning a ToolResponse that names failing field paths and expected types/required fields without echoing or logging offending values"}}