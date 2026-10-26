The DoD has 3 facets all checked `[x]`. The round brief's CI failure (spec-names) is now fixed. The acceptance test facets in "Done when these pass" are still pending CI verification. No new facets to add.

Unrelated smell noticed: test names at L35/L40 in orchestratorHelpers.test.ts describe swapped semantics (the name says "returns the first when the second is undefined" but the body tests returning the second when the first is undefined, and vice versa). I did not fix this — it's a pre-existing issue not named in the CI failures.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec-names CI failure: bracket-containing test names in orchestratorHelpers.test.ts stripped to match spec citations","tdd_next":"acceptance green"}}