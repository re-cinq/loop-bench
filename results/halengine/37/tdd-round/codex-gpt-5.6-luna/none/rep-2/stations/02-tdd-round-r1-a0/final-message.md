Implemented and pushed commit `8f09a08`.

- Added wrong-type validation messaging with field path and expected type.
- Added focused unit test with traceability.
- Updated DoD, spec links, and changelog.
- Focused test passes; no regressions observed.
- Branch is up to date with upstream.

Known acceptance-test lint findings remain untouched per the instruction not to edit acceptance tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"wrong-type input rejection reports field and expected type without leaking values","tdd_next":"valid extra-property passthrough and schema caching"}}