Implemented and pushed `174a718`.

- `onError` now receives wrapped non-Error rejections with original `cause`; caller rejection stays unchanged.
- Added and passed one focused regression test.
- Updated spec traceability and ticked the implementation facet.
- Red tests: 1 mine, 0 regressions.
- Remaining facets: existing-Error regression confirmation and CHANGELOG entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce non-Error rejections and call onError","tdd_next":"Confirm existing Error-instance tests remain green"}}