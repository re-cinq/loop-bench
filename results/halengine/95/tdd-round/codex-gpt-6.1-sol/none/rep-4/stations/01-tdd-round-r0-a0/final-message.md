Committed and pushed `c545ecc`. Non-Error rejections now reach `onError` wrapped with their original `cause`; callers still receive the original rejection.

One new test went red, then green. No regressions observed; existing and acceptance tests were not run. Branch is synchronized with upstream.

Next: changelog and CI verification. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections for onError while preserving the original rejection","tdd_next":"Add consumer changelog entry and confirm existing Error-instance tests through CI"}}