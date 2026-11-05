Blocked: the acceptance test uses invalid `PromptBuilderConfig` fields at line 30 and violates the one-expect rule. Your instructions explicitly require stopping when an acceptance test is wrong.

No files changed, tests run, or commits pushed. CI reports three static-check findings, not failing test counts; no new red tests or confirmed behavioral regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test has invalid PromptBuilderConfig and multiple expects; correcting it conflicts with the explicit prohibition on editing acceptance tests."}}