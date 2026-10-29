Committed and pushed the catch-path facet (`0934c0f`). A new test failed before the change and passed after formatting: `onError` now receives an `Error` whose `cause` is the thrown string, while the caller receives the original string. The branch is up to date with `main` and its upstream.

Red tests at the end of this round: **0 written here, 0 known regressions**. Acceptance tests were left for CI. The next facet is confirming existing `Error` instances pass through unchanged. Lore’s trace query was unavailable in this environment.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections for onError while preserving the original cause and caller rejection","tdd_next":"confirm existing Error-instance tests remain green without modification"}}