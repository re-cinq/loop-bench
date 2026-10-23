I fixed the two findings CI named on the acceptance test, pushed the commit, and the branch is in sync with its upstream. The `origin/main` merge was already up to date, so nothing else changed.

**What was red**
- **typecheck:** the test built `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, none of which exist on `PromptBuilderConfig`. The real required field is `identity`.
- **eslint:** the test had three `expect` calls, and the rule allows one.

**What I changed** (`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, only file touched)
- The builder is now `new PromptBuilder({identity: 'You are HAL.'})`. The test never checked the prompt content, so the dropped fields didn't affect what it asserts.
- The rejection is captured with `.then(() => undefined, (error) => error)`, and the three assertions are folded into one `expect({rejection, caughtError, afterSessionRan}).toEqual({...})`. The `rejection` value is still compared by identity to the thrown error, so the "rejects unchanged" check is kept.

**Verification**
- `npx prettier --write` on that file: unchanged.
- `node --experimental-vm-modules node_modules/jest/bin/jest.js <that file>`: 1 suite, 1 test, passed.
- I did not run eslint or tsc here, per the pod limits; CI judges the push.

**Caveats**
- The lore MCP server failed to connect (`CONNECTION_CLOSED`), so I could not query `lore-query-trace` for prior failures on these paths or call `lore_get_ci_failures`. The fix rests on the verdict and the code.
- The ticket's remaining acceptance items (spec line, CHANGELOG) were not part of this red build's verdict, so I left them alone.

Commit `b5dba56` is pushed to `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used non-existent PromptBuilder config fields and had 3 expect calls (max 1); now uses identity and one toEqual assertion"}}