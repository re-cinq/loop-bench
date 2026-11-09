The round is blocked because the acceptance test itself has CI errors: it supplies `baseSystemPrompt`, which is not a `PromptBuilderConfig` property, and exceeds the repository’s one-expect lint rule. The instructions prohibit editing an acceptance test and require stopping if one is wrong.

CI also reported a lint error in the previous round’s test and MongoDB startup failures in existing tests. I made no changes and ran no tests, so no commit or push was made. CI reported one red test from this branch and existing MongoDB failures; I cannot establish from the truncated verdict whether the latter are regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The acceptance test has typecheck and lint errors, but the round forbids editing acceptance tests."}}