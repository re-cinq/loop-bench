Also update the DoD to reflect that this was a CI repair round, not a new facet.

The push landed. The only remaining work is for CI to verify the acceptance test passes. All three facets in the DoD are already ticked. The ESLint error is fixed by changing the spec status from "Shipped" to "In Progress" — the two out-of-scope bug bullets (instanceof Error gate, afterModelResponse billing) cannot have test links until those separate issues are addressed, so "In Progress" is the correct status.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix ESLint coverage-status mismatch in spec (Shipped→In Progress)","tdd_next":"acceptance green"}}