The round is blocked by CI failures in the acceptance test. It uses `baseSystemPrompt`, which is not a `PromptBuilderConfig` property, and contains three assertions where the lint rule permits one. Fixing those findings requires editing the acceptance test, which the round instructions prohibit.

The previous round’s test also has a lint failure, and the changelog entry is missing. I made no changes, ran no tests, and did not commit or push. CI reported no behavioral test failures: **0 red tests were mine and 0 were identified as regressions**.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"CI requires changes to the acceptance test, but the round explicitly prohibits editing it."}}