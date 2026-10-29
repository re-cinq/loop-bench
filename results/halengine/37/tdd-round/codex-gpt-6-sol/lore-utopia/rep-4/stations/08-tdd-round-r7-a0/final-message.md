Committed and pushed one round (`7ae8041`). The new test first failed because an explicit extra-property rejection omitted the field path; it now passes, along with the other six tests in that file. I also repaired the CI lint findings and stale spec links. The branch is up to date with `main` and its upstream.

Red tests this round: **1 ours, 0 regressions**. The remaining unit tests and documentation updates are the next facet. CI will judge the acceptance tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Name explicitly forbidden extra-property paths and repair prior CI findings","tdd_next":"Add remaining unit tests, spec links, documentation, example, ADR, and changelog updates"}}