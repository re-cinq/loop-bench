Completed one red-green-refactor round and pushed commit `fa43d3f`. The new string-rejection test failed before the change and passed after it: `onError` receives an `Error` whose `cause` is the original string, while the caller still receives that string. I updated the spec, changelog, and facet checklist.

One red test was mine; no regressions were identified. I did not run acceptance tests. CI will judge the push. The branch is up to date with `main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce caught non-Error rejections for onError","tdd_next":"pin undefined rejection cause and caller value"}}