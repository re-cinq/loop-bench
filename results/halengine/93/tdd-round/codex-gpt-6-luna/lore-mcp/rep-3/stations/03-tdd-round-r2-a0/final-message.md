Committed and pushed `9deeb9c`. It repairs the three lint findings from the prior CI report, adds the missing spec link, updates `.lore/dod.md`, and moves the aggregation helper below its caller. The existing no-tool regression guard is unchanged. `origin/main` was already merged, and the branch is not ahead of upstream.

I ran no tests: the remaining facet was already covered by the unchanged guard, and I did not add a duplicate test. The Lore trace query was denied because its token lacks `read` scope. Red tests written this round: 0; regressions reported this round: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"preserve the unchanged no-tool regression guard and repair prior CI lint findings","tdd_next":"acceptance green"}}