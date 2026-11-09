Committed and pushed `5c26e1b`; branch is current with main and upstream.

One red-green-refactor round completed. The new test passes: non-`Error` rejections reach `onError` with their cause preserved, while callers receive the original value. Red tests: 1 mine, 0 known regressions. Acceptance tests remain for CI.

Next facet: handle values whose string conversion throws. No unrelated smells changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error turn rejections for onError while preserving caller rejection","tdd_next":"Handle rejection values whose string conversion throws"}}