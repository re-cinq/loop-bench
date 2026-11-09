Moved `beforeSession` inside the orchestrator’s error-handling block and pushed the change. The new test failed before the change and passed afterward. This round had **1 red test of its own and 0 known regressions**; the acceptance test was not run locally, as requested.

The spec guarantee and changelog facets remain for the next round. The spec’s existing “out of scope” introduction also contradicts its new guarantee and needs correction with that spec update. The test carries a spec anchor comment, but the repository’s test-list script does not currently expose a `spec` descriptor field.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block","tdd_next":"Update the hooks spec with the new guarantee"}}