The DoD facets haven't changed — no new facet was closed this round, this was a CI-repair round fixing the spec-link format that was broken by the previous round. No smells noticed that are worth naming.

**What this round did:** The previous push had 4 eslint `require-spec-link` errors and 4 `spec-links` errors, all caused by the same root issue: the spec's five `([validated by: ...])` citations were written as five separate trailing parentheticals. The spec-link parser only reads links from the single LAST trailing parenthetical, so lines `#L7`, `#L31`, `#L35`, `#L39` were invisible to the index. The fix merged all five into one combined trailing parenthetical so `inner.matchAll()` picks them all up.

**Next:** The open facets are (1) making the public hook signature explicitly typed as "turn total" with no `any`, and (2) spec/CHANGELOG accuracy + MINOR version bump.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI: merge spec validated-by links into single trailing parenthetical","tdd_next":"Make the public hook signature explicitly identify usage as the turn total, with no any; retain the existing single argument shape"}}