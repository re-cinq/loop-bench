Committed and pushed `a8b0d28`. Test descriptors now associate each test with its preceding spec stamp, and the spec has the introductory paragraph required by CI. The branch is up to date with `origin/main` and its upstream.

The new focused test failed before the change and passed afterward. The previous CI verdict reported **0 red tests and 0 regressions**; it reported one documentation lint failure, which this round addressed. CI will judge the push.

No unrelated smells were identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Associate individual tests with their own spec anchors","tdd_next":"Confirm existing Error-instance tests remain green through CI"}}