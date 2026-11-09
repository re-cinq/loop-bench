Fixed the CI-reported missing spec link and pushed commit `78837c9`. The branch is up to date with `origin/main` and its upstream.

No TDD facet was closed. The attempted type-contract test passed even with a nonexistent type because Jest transpiles type imports away, so I removed it. The public hook type remains the next facet. The attempted test had 0 red tests; CI reported 0 regressions. The coverage graph tool was unavailable.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix missing acceptance test spec link","tdd_next":"Make the public hook type explicitly describe total usage"}}