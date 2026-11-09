Blocked: the acceptance test uses `baseSystemPrompt`, which `PromptBuilderConfig` does not support. Your instructions explicitly require stopping when an acceptance test is wrong rather than editing it.

CI reports type/lint failures in two branch-added test files; no pre-existing test regressions are reported. I wrote no tests, ran no tests, and made no changes or commits. The requested `tdd-loop` skill was also absent from the searched skill locations.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test has an invalid PromptBuilderConfig fixture; correcting it requires editing an acceptance test, which the round instructions prohibit."}}