Implemented and pushed commit `3cc0818`.

- Added non-`Error` wrapping with preserved `cause`.
- Added focused regression test; it passes.
- Updated spec traceability and DoD.
- No acceptance, lint, typecheck, or full-suite tests run.
- Red tests: 1 authored, 0 regressions.
- Changelog facet remains for the next round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections for onError","tdd_next":"confirm existing Error tests and add CHANGELOG entry"}}