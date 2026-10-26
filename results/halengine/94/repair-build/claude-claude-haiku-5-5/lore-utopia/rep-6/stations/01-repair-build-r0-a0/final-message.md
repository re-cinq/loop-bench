The two red checks, typecheck and eslint, both came from one test file, `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`. I fixed both and pushed `83e5f0b` to `loop-bench/94`. The branch is no longer ahead of its upstream.

- **Typecheck (line 30):** the test passed `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig` to `PromptBuilder`, but its config type only has `identity`, `domainContext`, `responseGuidelines` and `toolPreamble`. I changed the constructor call to `new PromptBuilder({identity: 'You are HAL.'})`. The test doesn't depend on the prompt text.
- **Eslint (line 40, `re-lint/max-expects`):** the test had three `expect` calls. I captured the rejection with `.then(() => undefined, (error) => error)` and made one assertion, `expect({rejection, caughtError, afterSessionRan}).toEqual({...})`. The rejection is still checked by identity, as the original `toThrow` check was not.

Checks run here:
- `prettier --write` on the changed file left it unchanged.
- `node --experimental-vm-modules node_modules/jest/bin/jest.js <that file>` passed (1 test). Plain `npx jest` fails on ESM for every file in this repo, so I used the repo's own `test` command.

Not run here, per the pod rules: eslint and tsc. CI will judge those on the push.

The judged sha was `c3cd08a`, and the branch had not moved past it when I checked. Before committing I checked the failure history for both touched paths in lore; neither had recorded failures. I did not touch the spec or CHANGELOG, because the verdict didn't name them.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"beforeSession acceptance test: typecheck error on PromptBuilderConfig fields and max-expects lint error (3 expects) fixed in the test file"}}