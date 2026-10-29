Committed and pushed the round. The new `undefined` rejection test failed before the fix and passed afterward; it checks that `onError` receives an `Error` with the original value as `cause` while the caller receives the original rejection. I also updated the spec, changelog, traceability, and facet checklist.

Red tests: 1 written this round; 0 regressions reported. CI has not returned a verdict. No unrelated smells were changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce caught non-Error rejections for onError","tdd_next":"Confirm existing Error-instance tests remain green without modification"}}