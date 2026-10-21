Committed and pushed `786c09d`. The new test covers a final provider call with no usage; it failed against the previous last-round calculation and passes with aggregation. I also fixed both CI findings: the missing spec link and changelog entry. The branch is up to date with `main` and its upstream.

This round had **1 red test I wrote** and **0 regressions**. CI’s verdict on the push is pending.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"acceptance green"}}