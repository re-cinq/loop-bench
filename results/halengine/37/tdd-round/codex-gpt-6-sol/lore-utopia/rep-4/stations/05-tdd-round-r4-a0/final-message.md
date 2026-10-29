Committed and pushed one round (`9c9076a`). The new test went red for a property name containing `/`, then passed after the rejection path fix. I also fixed CI’s assertion-count finding. The branch is up to date with `main` and its upstream.

The previous CI verdict had one red acceptance test, zero red tests I wrote, and zero regressions. CI has not yet judged this push. I noticed no unrelated issues.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Decode escaped property names in rejection paths and repair CI assertion count","tdd_next":"Add remaining unit tests and update documentation and changelog"}}