The round is blocked by defects in the acceptance test identified by CI: [the test](/var/tmp/loop-bench/runs/c761e38c8e65/workspace/target/src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts:30) supplies an unsupported `baseSystemPrompt` property and exceeds the repository’s one-expect lint rule. The instruction to stop if an acceptance test is wrong prevents me from editing it.

I made no changes or commit and ran no tests. CI reported two check failures, not failing tests: this round introduced **0 red tests and 0 known regressions**.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The acceptance test has a type error and lint violation, and the instructions require stopping when an acceptance test is wrong."}}