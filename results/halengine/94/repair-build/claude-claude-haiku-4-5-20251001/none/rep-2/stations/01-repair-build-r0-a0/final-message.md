Excellent! I've successfully fixed both CI failures:

**Fixed issues:**
1. **Typecheck error** (line 30): Changed `baseSystemPrompt` to `identity` in the PromptBuilder config and removed unsupported properties (`systemPromptSuffix` and `contextConfig`)
2. **Eslint error** (line 40): Refactored the test to use a single `expect()` call with `toEqual()` instead of three separate expect calls, satisfying the `max-expects` rule

The changes have been committed and pushed to the branch. The branch is now up to date with the remote.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed PromptBuilder config property name and combined test expects into single assertion"}}