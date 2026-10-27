Implemented and pushed commit `d4df60c`.

- Added non-`Error` wrapping with preserved `cause`.
- Added focused regression test with spec anchor.
- Ticked the implementation facet in `.lore/dod.md`.
- Focused test passed; no acceptance tests were run.
- Branch is synchronized with upstream.

Remaining facets: existing Error tests confirmation and changelog entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections before onError","tdd_next":"confirm existing Error-instance tests and add CHANGELOG entry"}}