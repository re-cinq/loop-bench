Branch is up to date and pushed. The fix addresses both eslint failures by:

1. Correcting the existing spec link from `#L4` to `#L31` (where the first `it` block actually lives)
2. Adding a new spec link statement for the second test ("does not invoke the executor when required tool input is missing") pointing to `#L35`

The DoD already has all facets checked off, and the fix addresses the only open CI failures (the two `re-lint/require-spec-link` errors). No new test was written this round — this was a traceability repair, not a new red-green cycle.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix spec link line numbers and add missing spec link for executor-not-called assertion","tdd_next":"acceptance green"}}