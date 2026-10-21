The repair landed and the branch is in sync with its upstream (no ahead/behind).

**This round: CI repair, driven by the round brief's two findings on `54ebaf0`**

Both findings were in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, and both are fixed:

- **typecheck** (`chatOrchestrator.beforeSession.acceptance.test.ts:30`) — the test built a `PromptBuilder` with `baseSystemPrompt`/`systemPromptSuffix`/`contextConfig`, none of which exist on `PromptBuilderConfig` (it takes `identity`, `domainContext`, `responseGuidelines`, `toolPreamble`). Now `new PromptBuilder({identity: 'You are HAL.'})`, matching the idiom in `chatOrchestrator.test.ts:51`.
- **eslint** (`:40` — `re-lint/max-expects`, 3 expects where 1 is allowed) — consolidated into a single `toEqual` over a record of observations, the repo's established `outcomeOf` + one-object pattern (`chatOrchestrator.test.ts:142`). No assertion strength was given up: the record still carries the identity check on the thrown error (`error === errorToThrow`), the rejection message the caller sees, and now also the `onError` → `afterSession` order the spec statement claims (guaranteed by construction — `onError` is in the `catch` at `chatOrchestrator.ts:150`, `afterSession` in the `finally` at `:159`).

Also re-anchored the spec's `validated by` link to the test's new line (`spec.md:24`, `#L40` → `#L35` — no `scripts/spec-links/reanchor.mjs` in this repo, so verified by hand) and ticked the repair in `.lore/dod.md`. The three implementation facets were already closed; the acceptance item stays unchecked for CI to judge.

**Test runs:** this round ran no tests here — the only file involved is the acceptance test `.lore/dod.md` names, which this pod does not run; and typecheck/eslint are CI's steps by design. Prettier was run on the changed file (already clean). **Red tests:** 0 mine, 0 regressions — the two findings were compile/lint debt in the test written last round, not failing assertions.

**Smells noticed, not acted on:** the `outcomeOf` helper is now defined identically in three test files and could be shared.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair the acceptance test's CI findings (PromptBuilderConfig typing + re-lint/max-expects)","tdd_next":"acceptance green"}}