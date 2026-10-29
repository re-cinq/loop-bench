Committed and pushed one round. The new test failed before the fix and passed afterward: `onError` now receives an `Error` with the string rejection as its `cause`, while the caller receives the original string. The spec, changelog, and facet checklist are updated.

This round had **1 red test of mine and 0 regressions**. I ran only the new test; CI will judge the acceptance tests. No unrelated issues were changed. The branch is up to date with `main` and has no unpushed commits.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce caught non-Error rejections for onError","tdd_next":"pin cause and unchanged caller rejection for a plain object and undefined, and same-instance delivery for an existing Error"}}