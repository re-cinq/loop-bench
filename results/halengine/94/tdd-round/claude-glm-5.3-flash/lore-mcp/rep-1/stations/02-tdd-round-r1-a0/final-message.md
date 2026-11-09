Round complete. Summary:

**What this round owed:** the round brief's `CI reported failures` section on `2cbf106` — two findings, both in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:
1. **typecheck** — the test built `PromptBuilder` with `baseSystemPrompt`/`systemPromptSuffix`/`contextConfig`, fields that don't exist on `PromptBuilderConfig` (whose required key is `identity`). Replaced with `new PromptBuilder({identity: 'You are HAL.'})`, matching how every other test in the package constructs it.
2. **eslint** (`re-lint/max-expects`, max 1) — the test's three expects now fold into one object asserted with a single `toEqual`: `{rejection, onErrorSawTheThrow, afterSessionRan}`, each an identity check (`error === errorToThrow`) so nothing weakened — the caller still gets the *same* error object, and `onError` receives it.

I also re-anchored the spec's `validated by` link by hand (no `scripts/spec-links/reanchor.mjs` in this repo): the test title moved `#L40` → `#L32`.

**Verification:** the Bash hook refused a local run of this file — it is the acceptance test `.lore/dod.md` lists, so CI owns it — and this round therefore **ran no tests here**. I confirmed the assertions against the implementation by reading `chatOrchestrator.ts:150-161`: `onError` fires for a thrown `Error`, the original is rethrown (identity holds), `afterSession` runs in `finally`. The implementation itself (beforeSession inside the `try`, spec guarantee, CHANGELOG migration note) landed last round and is untouched.

**Delivered:** committed as `e2d9ee6`, pushed; `origin/main` already contained (no merge); `git status` reports up to date with upstream, tree clean.

**Red tests:** 2 findings, both on this ticket's own test file — 0 regressions in tests this ticket didn't write.

**Unrelated smells:** none new; the two out-of-scope items (the `instanceof Error` gate on `onError`, usage accounting across tool rounds) are already recorded in `.lore/dod.md` and untouched.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix the two CI findings on the beforeSession acceptance test (typecheck: PromptBuilderConfig fields; eslint: max-expects) and re-anchor the spec link","tdd_next":"acceptance green"}}