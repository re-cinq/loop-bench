Completed and pushed one round as `f3210b1` (`Test dynamic tool input schemas`). The dynamic-schema test passed; the prior CI typecheck and ESLint findings were also addressed. The branch is synchronized with its upstream, and `origin/main` was already merged.

The next facet is the remaining unit tests and documentation updates. I did not run acceptance tests, lint, or typecheck. One test I wrote is green; no regressions were reported by CI in this round. Unrelated smells noticed: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"function-valued tools validate against distinct schemas on successive executions","tdd_next":"remaining unit tests and documentation updates"}}