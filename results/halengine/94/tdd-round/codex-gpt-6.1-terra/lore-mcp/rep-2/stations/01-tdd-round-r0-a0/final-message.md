Moved `beforeSession` into the orchestrator’s error-handling block and pushed commit `18b4bdf`. The new focused test passed after the change; it had one expected failure in the red phase, with no regressions reported. The branch is up to date with its upstream and `origin/main`.

The spec context and changelog remain for the next round. The test carries a spec anchor, but the repository’s current test-listing script does not expose a `spec` field. An unrelated existing subprotocol test inspects source text; it was left untouched.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block","tdd_next":"Update the hook spec guarantee and surrounding context"}}