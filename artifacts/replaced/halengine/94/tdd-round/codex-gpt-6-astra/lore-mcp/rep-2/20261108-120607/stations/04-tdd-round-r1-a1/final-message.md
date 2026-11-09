Blocked: the acceptance test supplies unsupported `PromptBuilderConfig` fields at line 30. Your instructions explicitly require stopping when an acceptance test is wrong and prohibit editing it to pass.

CI reports three type/lint findings, not failing behavioral tests: 0 newly written red tests and 0 reported regression tests. No files changed, tests run, or commits pushed. The requested `tdd-loop` skill was also unavailable.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test uses invalid PromptBuilderConfig fields; correcting it conflicts with the explicit prohibition on editing acceptance tests."}}