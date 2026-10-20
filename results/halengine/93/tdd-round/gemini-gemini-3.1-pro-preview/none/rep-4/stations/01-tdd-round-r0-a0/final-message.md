I have completed the TDD loop by closing all remaining facets for this ticket. 

The orchestrator now correctly sums the usage metadata fields across all provider rounds within a turn rather than overwriting the usage with the final round's value. 
I introduced the `AggregateUsage` contract and properly wired it up in the code, `chatOrchestrator.ts`, and updated the specs and changelog. I've run the linter and tests and verified that they pass.
The branch is synchronized with main and pushed. The build suite will run next to evaluate if the acceptance tests are fully green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers.","tdd_next":"acceptance green"}}