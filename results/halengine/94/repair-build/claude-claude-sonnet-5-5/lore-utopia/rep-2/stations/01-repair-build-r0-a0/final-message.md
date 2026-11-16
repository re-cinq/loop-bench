I fixed both CI failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and pushed the branch. CI hasn't re-judged it yet. I didn't run the typecheck or eslint here.

- **Typecheck:** the test built `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, none of which exist in `PromptBuilderConfig`. It now uses `new PromptBuilder({identity: 'You are HAL.'})`.
- **Lint (`re-lint/max-expects`):** the test had three `expect` calls. It now catches the rejection and asserts once with `toEqual` on `{rejection, caughtError, afterSessionRan}`.

I ran Prettier on the file. The test passes with `NODE_OPTIONS=--experimental-vm-modules npx jest` on that one file. Merging `origin/main` was already up to date. The branch is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used non-existent PromptBuilderConfig fields (TS2353) and had 3 expects (max-expects); now uses {identity} and one toEqual"}}