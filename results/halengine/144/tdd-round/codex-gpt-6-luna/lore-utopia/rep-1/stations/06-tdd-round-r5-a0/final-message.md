Fixed both ESLint findings in `validation.ts` by using computed property keys for the snake_case message types. Formatted the file, committed as `c980a19`, pushed, and confirmed the branch is up to date with its upstream. No tests were run; this round repaired the CI findings and added no test.

The DoD facets were already ticked, so no facet was closed. I found no unrelated smells.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair ESLint findings in validation.ts","tdd_next":"acceptance green"}}