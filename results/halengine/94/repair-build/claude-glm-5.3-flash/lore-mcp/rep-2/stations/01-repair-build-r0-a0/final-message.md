Both red findings are fixed, committed as `f72e81d`, and pushed; `origin/main` is already up to date with the branch and `git status` confirms the branch is not ahead of its upstream.

**What CI named and what I did:**

Both findings were in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` — the ticket's behavioral work (moving `beforeSession` inside the `try`, spec, CHANGELOG) was already correct in `c3cd08a`; only this new test file's shape was wrong.

1. **typecheck TS2353 at line 30** — the test constructed `PromptBuilder` with `baseSystemPrompt`/`systemPromptSuffix`/`contextConfig`, none of which exist on `PromptBuilderConfig` (`{identity, domainContext?, responseGuidelines?, toolPreamble?}` in `src/infrastructure/builders/promptBuilder.ts:1`). Fixed to `new PromptBuilder({identity: 'You are HAL.'})`, matching how every other test in the repo builds it.
2. **eslint `re-lint/max-expects` at line 40** — 3 expect calls in one test. Fixed using the idiom already established in `chatOrchestrator.test.ts:17` (*"One expect per test needs the rejection as a value rather than a matcher"*): the rejection is captured via an `outcomeOf` helper and all three guarantees are asserted in a single `expect` on one object — the caller still gets the rejection, `onError` received the exact thrown error, `afterSession` ran. No test was weakened; each acceptance criterion is still pinned.

Also checked per protocol: branch hadn't moved past the judged sha `c3cd08a`, the failure graph had no prior recorded failures on either file, and the existing non-throwing tests remain unedited. Per the pod's constraints I ran only `npx prettier --check` on the changed file (clean) — no eslint, typecheck, or build locally; CI judges those.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used a nonexistent PromptBuilderConfig shape (TS2353) and 3 expects in one test (re-lint/max-expects); now builds PromptBuilder with identity and asserts one object via the repo's outcomeOf idiom"}}