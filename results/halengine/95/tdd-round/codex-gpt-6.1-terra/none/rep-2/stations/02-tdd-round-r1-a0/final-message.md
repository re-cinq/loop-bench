Committed and pushed `14649fa`. The new test verifies that object and `undefined` rejections reach `onError` as the wrapped cause and reach the caller unchanged. It passed with the branch implementation.

I also corrected the CI-reported timestamp, spec links, and changelog entry. The working tree is clean and the branch is up to date with its upstream and `origin/main`.

The red phase had **1 test written this round and 0 regressions**. CI’s previous verdict reported lint, spec-link, and changelog findings; its next run will judge those fixes. The requested coverage graph tool was unavailable. No unrelated issues were identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Verify object and undefined rejection causes and propagation; fix reported CI findings","tdd_next":"Confirm existing Error-instance tests remain green"}}