Implemented, committed, and pushed commit `3d29ab0`.

- Added non-`Error` rejection wrapping with preserved `cause`.
- Original rejection still propagates unchanged.
- Added and passed one focused Jest test.
- Red tests: 1 authored, 0 regressions.
- Updated spec traceability and `.lore/dod.md`.
- Next facet: confirm existing `Error` instances pass through unchanged.
- Branch is synchronized with `origin/main` and upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections before calling onError","tdd_next":"confirm existing Error-instance tests remain green without modification"}}