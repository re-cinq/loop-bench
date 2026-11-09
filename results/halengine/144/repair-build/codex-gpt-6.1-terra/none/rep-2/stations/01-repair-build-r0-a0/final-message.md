Pushed commit `f158263` and merged the current `origin/main`; the branch is up to date with its upstream.

The three affected test suites pass: 32 tests passed using the targeted Jest command. The full `npm run test:coverage` run failed before the final correction: the acceptance test used a ping as a barrier for an asynchronous response, and an optional-peer test’s internal build also failed. The latter run had a duplicate import that has since been removed, but I did not rerun the full command, so a green build remains unverified.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Targeted suites pass; full npm run test:coverage failed before the final correction and has not been rerun"}}
