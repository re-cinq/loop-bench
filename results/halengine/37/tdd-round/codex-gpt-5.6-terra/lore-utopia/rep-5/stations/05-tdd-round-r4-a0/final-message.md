Implemented and pushed `4376b5b`.

- Added red/green coverage for nested required-field paths.
- Rejection now reports `/address/country`, preserving the full JSON pointer.
- Consolidated validation path formatting; resolves CI’s type/enum path fallback.
- Removed the duplicated unit-test fixture shape causing the lint finding.
- Ran only `src/orchestration/tools/registry.test.ts`: 4 passed.
- CI had 2 ticket tests red and 0 unrelated regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve full paths for nested required input validation failures","tdd_next":"Add the remaining registry/orchestrator unit tests and documentation updates"}}