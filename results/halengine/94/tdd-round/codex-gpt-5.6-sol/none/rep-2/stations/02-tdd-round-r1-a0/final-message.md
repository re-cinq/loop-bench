The acceptance test is invalid: it constructs `PromptBuilder` with nonexistent `PromptBuilderConfig` fields and violates the repository’s one-expect rule. Fixing those findings requires editing the acceptance test, which the round rules explicitly prohibit. I therefore stopped without edits, tests, commit, or push.

Red tests: 1 acceptance test; regressions: 0.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The acceptance test is invalid and repairing its type/lint errors would require editing it, which this round forbids."}}