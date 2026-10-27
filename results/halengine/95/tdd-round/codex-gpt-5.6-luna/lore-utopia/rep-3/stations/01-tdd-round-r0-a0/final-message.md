Implemented and pushed commit `4dd7a3e`.

- `onError` now fires for non-`Error` rejections, wrapping them with readable messages and preserving `cause`.
- Added and passed one focused test for `undefined` rejection.
- Updated spec links and ticked the implementation facet.
- No regressions observed; remaining changelog/existing-test facets are for later rounds.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"normalize non-Error rejections before onError","tdd_next":"confirm existing Error-instance tests and add the CHANGELOG entry"}}