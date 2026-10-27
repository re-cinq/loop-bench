Added a test for invalid static schemas and fixed the two lint findings reported for `registry.test.ts`. The test file passed. The new assertion was green immediately because the registration behavior was already implemented; this round had **0 tests that went red** and **0 confirmed regressions**. The prior CI brief reported a test step failure but did not identify a failing test.

Committed and pushed `919f2d9`. The branch is synchronized with its upstream, and `origin/main` merged cleanly. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static schemas at registration and name the tool when a schema is invalid","tdd_next":"Validate input before executor invocation and complete the remaining tests and documentation"}}