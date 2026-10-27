Implemented the default-off `transport.history.enabled` option, threaded it through `createHalEngine` and `createServer`, and added an `UNSUPPORTED` response when history is disabled. Updated the protocol spec and regenerated the getting-started example.

The new focused test failed before the change and passed after it. No regression tests were reported. Formatting and `docs:fix` completed; the branch is pushed at `dccfffb`, merged with `origin/main` (already up to date), and not ahead of its upstream.

The previous CI verdict still reports `eslint` and `spec-names` failures. The round brief truncates the findings, and Lore returned 404 for the branch, so I could not recover the full list to address them. The branch’s checklist and the ticket also use different frame names (`list_sessions` vs. `list_conversations`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add the default-off transport.history.enabled option and thread it through createServer","tdd_next":"Distinguish a store without listFor from an empty history and return UNSUPPORTED"}}