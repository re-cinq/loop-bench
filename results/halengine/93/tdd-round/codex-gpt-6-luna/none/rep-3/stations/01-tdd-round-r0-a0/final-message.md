Implemented one TDD round: usage reported by provider rounds is now summed, and rounds without usage are skipped. The focused test failed before the change and passed afterward. I formatted the changed TypeScript files and left the existing no-tool regression test untouched.

Committed and pushed as `49d9415`; the branch is up to date with `origin/main` and its upstream. **TDD red tests:** 1 intentional; **regressions:** 0 reported. I did not run acceptance tests or other tests.

The Lore trace query command and Lore test descriptor tools were unavailable in this pod. The spec statement links to the new test, and `.lore/dod.md` records the facet closed. No round brief was present. The public hook type and changelog remain for the next facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}