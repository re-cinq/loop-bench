Committed and pushed `7538e00`. The test added this round failed on array index formatting, then passed after the fix. I also fixed the camelcase finding from the previous CI verdict. One red test was mine; no regression was identified. The previous CI test failure remains unclear because its log excerpt was truncated, so CI will judge this push.

The remaining facet is the unit tests and documentation updates in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Render array indexes in validation error paths with brackets and repair the prior CI camelcase finding","tdd_next":"remaining unit tests and documentation updates"}}