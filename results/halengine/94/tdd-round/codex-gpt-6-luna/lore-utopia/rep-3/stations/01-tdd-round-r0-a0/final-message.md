Moved `beforeSession` inside the orchestrator’s `try`, added a focused regression test, updated its spec citation, and ticked the implementation facet in the DoD.

The test failed before the change and passed afterward. One test was mine; no regressions were identified. CI’s failure lookup could not find this branch, so its verdict is unknown. Remaining facets: update the spec guarantee and document the consumer change in the changelog.

Committed and pushed as `28a2f43`; merged `origin/main` (already up to date). The branch is clean and matches its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"}}