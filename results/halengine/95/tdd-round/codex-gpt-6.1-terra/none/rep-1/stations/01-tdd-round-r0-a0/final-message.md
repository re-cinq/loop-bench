The round is committed and pushed as `ac62f47`. The new test failed before the change and passed afterward: `onError` receives a wrapped object with the original rejection as its `cause`, while the caller receives the original object.

The next facet is handling values whose string conversion throws. CI must also confirm the existing Error-instance tests and acceptance tests; those were not run locally. This round observed one red test of its own and no reported regressions. The coverage graph tool was unavailable.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap ordinary non-Error rejections with their original cause","tdd_next":"Handle rejection values whose string conversion throws"}}