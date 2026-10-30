Completed and pushed commit `36e86f2`.

- Added wrong-type validation messages with property path and expected type, without leaking values.
- Added and linked one unit test; red then green, with 2/2 tests passing.
- Fixed all CI-reported lint/type/changelog findings.
- Red tests: 1 mine, 0 regressions.
- Branch is synchronized with upstream and current with `origin/main`.
- Next facet: static schema compilation errors and function-schema validator caching.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input before execution with safe field-and-type rejection messages","tdd_next":"Compile static schemas with named registration errors and cache function-valued schemas by object reference"}}