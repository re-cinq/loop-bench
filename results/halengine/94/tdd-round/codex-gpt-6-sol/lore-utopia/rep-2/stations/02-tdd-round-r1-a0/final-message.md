The round is blocked by the acceptance test itself. Its `PromptBuilder` fixture uses `baseSystemPrompt`, which is not in `PromptBuilderConfig`, and CI also reports a lint error in that test. Fixing those findings requires editing an acceptance test, which the round rules prohibit. I made no changes and ran no tests here.

CI reported no failing runtime tests, so I found 0 red tests of mine and 0 regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The acceptance test has a type error and a lint error that require editing the protected acceptance test."}}