Implemented and pushed commit `662185d` (`feat(transport): answer session list frames`). The new focused test failed before the handler change and passed afterward. I ran only that test file; acceptance tests, lint, and typecheck were not run. One test was mine and went green; I observed zero regressions. The branch is up to date with its upstream.

This round closed the message types, store wiring, and `list_sessions` handler facets. The next facet is documenting the frames in the protocol spec.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore and handle list_sessions frames","tdd_next":"Document list_sessions and session_list in the protocol specs"}}