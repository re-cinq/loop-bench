### TDD Round Summary

- **Red Phase**: Added unit test `throws at register time when the inputSchema is uncompilable and the message names the tool` to `src/orchestration/tools/registry.test.ts` and linked it from `specs/hal-engine-tool-input-validation/spec.md`. Executed the test alone and confirmed it failed as expected.
- **Green Phase**: Added `ajv` to `dependencies` in `package.json` and `package-lock.json`, bumped the package version to `0.4.0`, updated `CHANGELOG.md` with an unreleased entry, and implemented static schema compilation and dynamic `WeakMap` validator caching in `ToolRegistry` (`src/orchestration/tools/registry.ts`). Re-ran the unit test and confirmed it passed.
- **Refactor Phase**: Formatted modified files with Prettier, verified spec anchor links and status via `node scripts/check-spec-anchor-names.mjs --fix`, `node scripts/check-spec-links.mjs`, and `node scripts/check-spec-status.mjs`. Checked off the closed facets in `.lore/dod.md`.
- **Delivery**: Staged and committed changes as `feat(tools): compile static tool inputSchema at register time`, pushed to `origin/loop-bench/37`, confirmed the branch is level with upstream `origin/main`.

**Test metrics**:
- Red tests written this round: 1 (now green)
- Regressions: 0
- Unrelated smells: None noticed

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static ToolDefinition.inputSchema at ToolRegistry.register time (throwing an error naming the tool on invalid schemas) and cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference (WeakMap).","tdd_next":"Validate input in ToolRegistry.execute before invoking the executor, returning a ToolResponse ({result}) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at specs/hal-engine-tool-input-validation/spec.md."}}