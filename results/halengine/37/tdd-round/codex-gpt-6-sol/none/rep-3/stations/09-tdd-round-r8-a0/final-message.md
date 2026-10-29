Committed and pushed one red–green–refactor round. The new test exposed a reused static schema that escaped registration-time validation; it now passes after the fix. The branch is current with `origin/main` and its upstream.

The previous CI brief reported a failed test job but named no failing test, so I cannot classify its red tests as mine or regressions. The remaining unit tests and documentation are the next facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Recompile a reused static schema at each registration","tdd_next":"Add remaining unit tests and update documentation and changelog"}}