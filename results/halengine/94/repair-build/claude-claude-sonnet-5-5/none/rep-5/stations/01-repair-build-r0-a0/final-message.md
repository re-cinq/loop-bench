I fixed both red checks in the acceptance test `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`. The fix is pushed, and the branch is not ahead of its upstream. I did not check whether the branch moved since CI judged c3cd08a.

- **typecheck (TS2353):** the test built `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, none of which `PromptBuilderConfig` has. It now uses `new PromptBuilder({identity: 'You are HAL.'})`, the same form `chatOrchestrator.test.ts` uses.
- **eslint (`re-lint/max-expects`, line 40):** the test had three `expect` calls. They are now one `toEqual` on `{outcome, caughtError, afterSessionRan}`. The rejection is captured with `.catch`, so the test still checks that `beforeSession`'s error reaches the caller unchanged.

I ran the test file with jest (`NODE_OPTIONS=--experimental-vm-modules`) and it passes. Prettier left the file unchanged. As instructed, I did not run eslint or the typecheck here, so CI will judge those on the push. Merging `origin/main` brought in nothing new.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used a nonexistent PromptBuilderConfig shape (TS2353) and had 3 expects (max-expects); now valid config and a single toEqual"}}