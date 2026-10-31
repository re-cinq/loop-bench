Implemented and pushed `600ffe7`.

- `onError` now receives an `Error` for every caught rejection; non-Errors retain the original value as `cause` while the caller still receives it unchanged.
- Added one focused string-rejection regression test; red then green.
- Updated hook spec traceability and checked the implementation facet.
- Ran only the new named Jest test; it passed. Acceptance tests were not run.
- CI had no available branch verdict. Red tests: 1 mine, 0 regressions.
- Next facet: confirm the existing Error-instance tests remain green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce non-Error rejections for onError while preserving caller rejection","tdd_next":"Confirm existing Error-instance tests remain green"}}