Blocked: the acceptance test is invalid and cannot be edited under the ticket rules. It constructs `PromptBuilder` with unsupported `baseSystemPrompt` (the required field is `identity`) and violates the one-expect lint rule with three assertions. Fixing either requires changing the acceptance test; changing production types/lint configuration would be unrelated and misleading.

No files changed; no tests run. Red tests written this round: 0. Regressions: 0 identified.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The acceptance test must be corrected (unsupported PromptBuilderConfig.baseSystemPrompt and three-expect lint violation), but ticket rules prohibit editing it."}}