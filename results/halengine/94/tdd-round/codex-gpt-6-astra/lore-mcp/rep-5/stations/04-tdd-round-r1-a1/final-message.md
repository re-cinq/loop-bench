Blocked: the acceptance test uses invalid `PromptBuilderConfig` fields and violates the one-expect rule. Your instructions explicitly require stopping when an acceptance test is wrong, without editing it.

CI also reports a forbidden import in `sessionCleanup.test.ts`. No behavioral test failures were reported: 0 new red tests this round, 0 reported regressions.

No files changed, tests run, or commits pushed.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test has invalid configuration and lint errors; correcting it conflicts with the explicit prohibition on editing acceptance tests."}}