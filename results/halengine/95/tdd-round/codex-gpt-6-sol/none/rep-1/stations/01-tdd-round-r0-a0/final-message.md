Committed and pushed one round (`2c427f9`). The new test failed before the fix and passed afterward: `onError` now receives an `Error` whose `cause` is the thrown string, while the caller receives the original rejection. I ran only that test; CI will judge the acceptance tests and existing `Error` cases.

Red tests observed: 1 new test, now green; 0 regressions observed. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections for onError while preserving the original caller rejection","tdd_next":"Pin object and undefined rejection values as Error.cause"}}