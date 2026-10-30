Completed and pushed commit `2d992aa`.

- Wrapped non-`Error` rejections for `onError`, preserving the original as `cause`.
- Original rejection still propagates unchanged.
- Added and passed one focused test.
- Updated spec traceability and `.lore/dod.md`.
- Red tests: 1 ours, 0 regressions.
- Next facet: confirm existing `Error`-instance tests remain green.
- Branch is synchronized with `main` and upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce caught non-Error rejections before calling onError","tdd_next":"confirm existing Error-instance tests remain green without modification"}}