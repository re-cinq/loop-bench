Added and ran the focused `Error` identity test; it passed. The implementation already preserved the same `Error` instance, so this facet had no failing behavior to expose locally. I also fixed the prior CI findings: deterministic acceptance-test timestamps, updated spec links, and a changelog entry. No unrelated issues were found.

Committed and pushed `9213873`; the branch is up to date with `origin/main` and its upstream. No test failures were red in this round; there were no test regressions reported in the previous CI verdict. I ran only the new test file.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Confirm Error-instance identity and document the onError behavior change; repair prior CI findings","tdd_next":"acceptance green"}}