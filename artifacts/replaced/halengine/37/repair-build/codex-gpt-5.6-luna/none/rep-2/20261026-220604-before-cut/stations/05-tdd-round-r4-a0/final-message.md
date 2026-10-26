Branch is pushed and up to date. This round:

- **Red**: `registry.test.ts` was missing a test for the unregistered-tool-throws path, causing the `src/orchestration/` coverage to fall below the 88.3% statement threshold (87.86%).
- **Green**: Added `throws for an unregistered tool name` at line 48 of `registry.test.ts`; all 395 tests pass; coverage for `src/orchestration/` is now 92.36%.
- **Refactor**: none needed.

The spec statement on line 15 of `specs/hal-engine-tool-input-validation/spec.md` now has its `([validated by…])` link, satisfying `re-lint/require-spec-link` for the new test.

Smells noticed but not acted on: `formatValidationErrors` still has uncovered enum/fallback branches (lines 147–150) and the three static-compile-once / dynamic-per-call spec statements still lack test links — these are the next work items in facet 4.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"unknown-tool-throws unit test + spec link + orchestration coverage floor fix","tdd_next":"static-compile-once test and dynamic-per-call test in registry.test.ts (links remaining spec statements)"}}