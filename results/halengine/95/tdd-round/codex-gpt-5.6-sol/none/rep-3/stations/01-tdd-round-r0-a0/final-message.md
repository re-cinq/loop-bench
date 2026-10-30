Implemented and pushed commit `36497c9`.

- Wrapped non-`Error` rejections for `onError`, preserving the original as `cause`.
- Original rejection still propagates unchanged.
- Added and passed one focused Jest test.
- Red tests: 1 ours, 0 regressions.
- Branch is synchronized with `origin/main` and upstream.
- Next facet: verify existing `Error` instances pass through unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce caught non-Error rejections before calling onError","tdd_next":"confirm existing Error-instance tests remain green without modification"}}