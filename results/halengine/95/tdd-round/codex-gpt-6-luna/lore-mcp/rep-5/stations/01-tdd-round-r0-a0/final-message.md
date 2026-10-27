Implemented and pushed commit `91865c1`. The string rejection test went red, then passed after the catch-path change; **1 red test was mine, 0 regressions were identified**. CI’s verdict wasn’t available from Lore. The branch is up to date with its upstream.

The next round takes confirming the existing `Error` tests and adding the changelog entry. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections for onError while preserving the original rejection and cause","tdd_next":"Confirm existing Error-instance tests remain green and add the changelog entry"}}