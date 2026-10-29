Committed and pushed the round. The new test went red, then green after normalizing bracket-quoted required-property names. I also fixed all three lint findings from the previous CI verdict. One red test was mine; there were zero regressions. The branch is up to date with `main` and its upstream.

The remaining facet is the unit tests and documentation updates; CI will judge this push. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize legacy required-property errors and repair CI lint findings","tdd_next":"Add remaining unit tests and update tool documentation"}}