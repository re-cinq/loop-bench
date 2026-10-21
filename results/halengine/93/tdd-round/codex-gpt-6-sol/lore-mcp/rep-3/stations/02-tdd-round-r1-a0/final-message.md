Committed and pushed the CI lint repairs in `2270eb2`. The missing spec link is in place, the spec status reflects its current coverage, and `.lore/dod.md` is updated. The branch is up to date with `main` and its upstream.

The aggregation behavior was already implemented, so this round added no new test and ran no tests locally. The prior CI report showed 0 red tests written here and 0 regressions; the new push awaits CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"acceptance green"}}