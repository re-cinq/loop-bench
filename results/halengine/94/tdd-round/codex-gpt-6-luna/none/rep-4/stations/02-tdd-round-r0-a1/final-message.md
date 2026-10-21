Moved `beforeSession` inside the orchestrator’s `try` block. The new focused test first failed, then passed with the original error propagated and hooks called in order. Updated the spec and checked off the two completed facets; the CHANGELOG facet remains for the next round.

Committed and pushed as `ec18e1d`; the branch is up to date with its upstream. The only test run was the one written this round. Red tests: **1 of mine**; regressions: **0 observed**. I couldn’t run the Lore trace query because neither a callable tool nor executable was available.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"move beforeSession inside try and specify failure cleanup","tdd_next":"document the consumer-visible change in CHANGELOG.md"}}