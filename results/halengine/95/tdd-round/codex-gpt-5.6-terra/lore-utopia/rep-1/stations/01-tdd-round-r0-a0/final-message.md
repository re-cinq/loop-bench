Implemented and pushed `85ac74b`.

- Added a focused red/green regression test for a string rejection’s `Error.cause`.
- `onError` now receives an `Error` for every caught rejection while the original value is rethrown.
- Updated the hook spec trace link and checked the implementation facet.
- Ran only the new test: passed. Acceptance tests were not run.
- No CI regressions were reported locally (CI lookup had no branch record); red tests: 1 mine, 0 regressions.
- Remaining facets: existing-`Error` confirmation and CHANGELOG entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce caught non-Error rejections so onError always fires","tdd_next":"Confirm existing Error-instance tests remain green without modification"}}