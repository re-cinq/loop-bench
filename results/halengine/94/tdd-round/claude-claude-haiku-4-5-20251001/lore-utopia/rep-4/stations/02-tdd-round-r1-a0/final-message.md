Perfect! I've successfully fixed all three CI failures from the previous push:

1. **Type error** - Fixed the `PromptBuilderConfig` by using only the `identity` property instead of non-existent `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig`

2. **Eslint max-expects violation** - Split the single test into three separate tests, each with only one expect call:
   - `rejects when beforeSession throws`
   - `calls onError when beforeSession throws`
   - `calls afterSession when beforeSession throws`

3. **Missing CHANGELOG entry** - Added a "Fixed" section documenting that `beforeSession` hook now reaches `onError` and triggers `afterSession` on error

The commit is pushed to the branch and it's up to date with origin/main. CI will now run the tests, and once the acceptance test passes, the next round can proceed with updating the spec as planned in the `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI failure fixes","tdd_next":"Update specs/hal-engine-config-hooks/spec.md"}}