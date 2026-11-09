The previous push’s CI verdict reports two failures in the acceptance test: it uses a `PromptBuilderConfig` property that does not exist, and it violates the one-expect lint rule. Fixing those findings would require changing the acceptance test or altering unrelated production or lint configuration. Your instructions say to stop if an acceptance test is wrong, so I made no changes and ran no tests.

CI reported one affected test file; I could not determine a count of red tests or regressions from the verdict.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The acceptance test has typecheck and lint errors, but the round forbids editing an incorrect acceptance test."}}