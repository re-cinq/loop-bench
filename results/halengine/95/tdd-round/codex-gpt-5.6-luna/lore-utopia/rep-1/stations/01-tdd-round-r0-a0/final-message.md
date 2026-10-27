Implemented and pushed commit `4da616f`.

- `onError` now wraps non-`Error` rejections with `cause`, preserving original propagation.
- Added focused test, changelog entry, and updated DoD facets.
- Focused test passed; acceptance suite not run.
- Red tests: 1 yours, 0 regressions.
- Branch is synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"non-Error rejection coercion and onError reporting","tdd_next":"acceptance green"}}