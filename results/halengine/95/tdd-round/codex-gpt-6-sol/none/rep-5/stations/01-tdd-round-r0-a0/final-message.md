Committed and pushed one round. The new test failed before the fix and passed afterward; I ran only that test. It confirms that `onError` receives an `Error` with an `undefined` cause while the caller still receives `undefined`. The spec, changelog, and facet checklist are updated. `origin/main` was already current, and the branch is fully pushed.

Red tests observed: 1 written this round, 0 regressions. No unrelated smells were changed. The next facet is CI confirmation that existing `Error` instances still pass through unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce non-Error rejections for onError and document the consumer change","tdd_next":"Confirm existing Error-instance tests remain green without modification"}}