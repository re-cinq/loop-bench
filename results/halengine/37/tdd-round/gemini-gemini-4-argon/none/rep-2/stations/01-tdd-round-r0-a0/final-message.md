Completed Round 1:
- Added `ajv` to runtime `dependencies` and bumped the package version `MINOR` to `0.4.0`.
- Added unit tests in `src/orchestration/tools/registry.test.ts` for static schema compilation at `register` time, reuse across `execute` calls without re-reading `inputSchema`, and per-call dynamic schema resolution with `WeakMap` caching.
- Implemented `inputSchema` compilation and `execute`-time validation in `src/orchestration/tools/registry.ts`, returning `{result}` naming failing field paths and expected types/required fields without echoing or logging offending values, and added the spec doc comment.
- Linked the schema compilation and caching statements in `specs/hal-engine-tool-input-validation/spec.md` and added the `CHANGELOG.md` entry.
- Red tests: 0 of mine remain red; 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ajv, compile/cache schemas in ToolRegistry, and validate tool input at execute time","tdd_next":"Add remaining unit tests in registry.test.ts and chatOrchestrator.test.ts, link remaining spec statements, and update example/docs/ADR"}}