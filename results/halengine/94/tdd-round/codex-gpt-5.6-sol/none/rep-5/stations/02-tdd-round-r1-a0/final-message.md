Blocked: the acceptance test itself fails CI independently of implementation:

- It passes unsupported `PromptBuilderConfig.baseSystemPrompt`.
- It violates the repository’s one-assertion rule with three `expect` calls.

The instructions prohibit editing acceptance tests and require stopping when one is wrong, so I made no changes, commit, or push. The previous round’s new test is red; the other CI failures are regressions from that push but could not be addressed after this mandatory stop.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The acceptance test is invalid: it uses unsupported PromptBuilderConfig.baseSystemPrompt and violates the max-one-expect rule, but acceptance tests may not be edited."}}