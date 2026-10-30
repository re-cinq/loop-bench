Implemented and pushed `419db4b`.

- `onError` now receives an `Error` for every rejection; non-Errors retain their raw value as `cause` and are rethrown unchanged.
- Added and passed the focused `undefined` rejection regression test (27 tests).
- Updated traceability links and checked off the implementation/compatibility facets.

Red tests: 1 mine; regressions: 0. Acceptance tests were not run locally. Next facet: CHANGELOG entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce non-Error rejections for onError while preserving the caller rejection","tdd_next":"Add the CHANGELOG entry under Unreleased"}}