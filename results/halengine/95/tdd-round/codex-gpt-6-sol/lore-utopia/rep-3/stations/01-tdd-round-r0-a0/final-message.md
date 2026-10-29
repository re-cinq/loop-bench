Committed and pushed the round. The new test first failed, then passed: an `undefined` rejection now calls `onError` with an `Error` whose `cause` is `undefined`, while the caller still receives the original rejection. I updated the spec, changelog, and facet checklist.

One red test was mine; zero regressions were reported. I ran only the new test. CI has not reported a verdict for this branch, so the next facet is confirming the existing `Error` tests remain green. The branch is up to date with `main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections for onError","tdd_next":"confirm existing Error-instance tests remain green"}}