Moved `beforeSession` inside the orchestrator’s error-handling block. The new focused test failed before the change and passed afterward. One red test was mine; no regressions were reported. The Lore trace and CI verdict tools were unavailable, so existing coverage and acceptance status could not be verified here.

Committed and pushed as `28ec747`; the branch is up to date with `origin/main` and its upstream. The spec still has stale surrounding wording, and the changelog entry remains for a later round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block","tdd_next":"Update the hook specification guarantee"}}