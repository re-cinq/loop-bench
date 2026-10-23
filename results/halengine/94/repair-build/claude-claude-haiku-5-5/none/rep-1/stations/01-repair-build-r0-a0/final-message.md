Both CI findings are fixed and pushed to `loop-bench/94`. The branch is up to date with its upstream and already contains `origin/main`, so no merge was needed.

**What was broken**

- **typecheck:** `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts:30` passed `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig` to `PromptBuilder`. Its config type only has `identity`, `domainContext`, `responseGuidelines` and `toolPreamble`. The test was written against a different config shape.
- **eslint:** the same test at line 40 had three `expect` calls in one `it`. The `re-lint/max-expects` rule allows one.

**What I changed** (one file, commit `5f603c1`)

- Built the prompt builder as `new PromptBuilder({identity: 'You are HAL.'})`.
- Split the single test into three: one checks the caller gets the rejection, one checks `onError` receives the thrown error, one checks `afterSession` ran. The assertions and the thrown error are unchanged.
- Ran `prettier --write` on that file only.

**What I ran locally**

- `npm test -- src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`: 3 of 3 passed.
- I did not run typecheck or eslint here, per the pod rules. The typecheck fix is by reading: `identity` is the only required field the constructor needs.

**Not done**

- The `lore-query-trace` check before reading files was not possible. The ToolSearch lookup returned no lore tools.
- The verdict named only typecheck and eslint, so I did not touch the spec or CHANGELOG. The earlier round had already updated them.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"beforeSession acceptance test used a PromptBuilder config shape that does not exist (typecheck) and had three expects in one test (eslint max-expects); fixed the config to identity and split into three tests"}}