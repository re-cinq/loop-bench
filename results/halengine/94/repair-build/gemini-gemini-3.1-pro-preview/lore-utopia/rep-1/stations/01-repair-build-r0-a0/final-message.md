I have fixed the issues reported by CI.
- Updated `PromptBuilderConfig` usage to pass `{ identity: 'You are HAL.' }` instead of the non-existent properties.
- Rewrote the test assertions to catch the error manually and combine the checks into a single `expect` object check to pass the `max-expects` rule.
- Formatted the file using Prettier.
- Committed and pushed the changes to the branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed type error with PromptBuilderConfig and refactored expects to satisfy max-expects"}}