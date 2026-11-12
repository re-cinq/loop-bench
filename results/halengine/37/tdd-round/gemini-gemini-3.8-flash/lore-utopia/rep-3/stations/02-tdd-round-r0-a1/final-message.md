### Round Summary: Validate input in ToolRegistry.execute

1. **Red phase**:
   - Added unit test `returns a ToolResponse naming the missing required field and does not invoke the executor` to `src/orchestration/tools/registry.test.ts`.
   - Linked this test statement in `specs/hal-engine-tool-input-validation/spec.md#L24` and verified with `scripts/check-spec-anchor-names.mjs` and `scripts/check-spec-links.mjs`.
   - Executed `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.test.ts` and confirmed the test failed (1 red test written this round, 0 regressions).

2. **Green phase**:
   - Implemented input schema validation in `ToolRegistry.execute`: retrieves static/dynamic compiled validators, validates `input`, and returns a rejection `ToolResponse` on failure without calling the executor or leaking offending values to result text or logs.
   - Added single-line doc comment pointing to `specs/hal-engine-tool-input-validation/spec.md`.
   - Re-ran `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.test.ts` and verified both tests pass (2 passed, 2 total).

3. **Refactor & Delivery**:
   - Formatted modified files with Prettier.
   - Updated `CHANGELOG.md` with an entry for `ToolRegistry.execute`.
   - Marked the facet complete in `.lore/dod.md`.
   - Committed with message `feat(tools): validate tool input against inputSchema at execute time` and pushed to `origin HEAD`.
   - Fetched and merged `origin/main` (already up to date) and verified `git status`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input in ToolRegistry.execute before invoking the executor, returning a ToolResponse ({result}) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at specs/hal-engine-tool-input-validation/spec.md.","tdd_next":"Add ajv to dependencies in package.json and package-lock.json and bump the package version MINOR."}}