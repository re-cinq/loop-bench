Implemented and pushed the `onError` rejection conversion in commit `6c2c1af`. Non-`Error` values are wrapped with the original as `cause`; the caller still receives the original rejection. The changelog and spec are updated.

The new focused test failed before the change and passed afterward: **1 red test was ours, 0 known regressions**. Lore could not retrieve the branch’s previous CI verdict, so CI must still confirm the existing and acceptance tests. The branch is up to date with `origin/main` and its upstream.

No unrelated issues were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Call onError with an Error for non-Error rejections while preserving the original cause and caller rejection","tdd_next":"Confirm existing Error-instance tests through CI"}}