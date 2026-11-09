The round is blocked by errors in the acceptance test. CI reports an invalid `PromptBuilderConfig` property and three assertions where the lint rule permits one. Correcting those findings requires editing the acceptance test, which the round’s rules explicitly prohibit. I stopped without changing or running tests.

CI reported no red tests from this round and no identified regression tests; its failures are typecheck, lint, and the missing changelog entry.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"CI reports typecheck and lint errors in the acceptance test, but the round forbids editing an incorrect acceptance test."}}