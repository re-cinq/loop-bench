Committed and pushed `cd727e7`. One new test went red → green; zero regressions observed, though CI was unavailable. Acceptance tests remain for CI.

Non-`Error` rejections now reach `onError` with their original cause. Formatting and trace links are updated. Branch is current with main and fully pushed.

Next: pin object and `undefined` causes. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections for onError while preserving the original rejection","tdd_next":"Pin plain-object and undefined causes; confirm existing Error tests through CI"}}