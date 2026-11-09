Committed and pushed static schema compilation at registration. Invalid schemas now throw an error naming the tool. The new test failed before the change and passed afterward; no acceptance tests were run locally.

This round had **1 red test written here and 0 known regressions**. No previous CI verdict was available. The Lore coverage graph was unavailable, and the repository’s test-list script does not expose a `spec` field; the new test has a spec anchor comment and a link from the spec, but descriptor traceability remains incomplete. The existing test-list limitation was left unchanged.

The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static tool schemas at registration","tdd_next":"Cache dynamic schema validators and validate tool input"}}