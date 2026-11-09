Committed and pushed `462f60f`. The hook now sums reported token counts across provider calls and leaves usage undefined when no call reports it.

The focused test failed before the change and passed afterward: **1 red test written this round, 0 known regressions**. Acceptance tests were left to CI as requested. The branch is up to date with `origin/main` and its upstream.

The Lore graph and CI-verdict tools were unavailable. The test carries a spec anchor, but the repository’s current test-list script does not expose a `spec` field, so automatic descriptor traceability remains unresolved. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum reported token fields across provider rounds","tdd_next":"Make the public hook type explicitly identify total usage"}}