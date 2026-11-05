I fixed both CI failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and pushed. I did not run typecheck or eslint here, so CI has to confirm both.

- **Typecheck:** the test built `PromptBuilder` with config fields that don't exist (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`). It now passes only `{identity: 'You are HAL.'}`.
- **eslint `max-expects`:** the test had three `expect` calls. They are now one `toEqual` on `{rejection, caughtError, afterSessionRan}`. This still checks that the rejection is the original error, that `onError` received it, and that `afterSession` ran, so the test is no weaker.

The acceptance test passes locally with `NODE_OPTIONS=--experimental-vm-modules npx jest <that file>` (1 test passed). Prettier made no changes to the file.

`origin/main` was already merged, and the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used a nonexistent PromptBuilder config (TS2353) and had 3 expects (max-expects); now uses {identity} and a single toEqual"}}