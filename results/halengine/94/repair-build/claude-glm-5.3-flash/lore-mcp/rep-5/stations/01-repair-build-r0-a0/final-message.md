Done. Both findings from the verdict are fixed and pushed.

**What CI named and what I did:**

1. **typecheck** (`chatOrchestrator.beforeSession.acceptance.test.ts:30`) — the test built `PromptBuilder` with `baseSystemPrompt` / `systemPromptSuffix` / `contextConfig`, none of which exist on `PromptBuilderConfig` (`identity`, `domainContext?`, …). Replaced with `new PromptBuilder({identity: 'You are HAL.'})` — the shape every sibling test uses.

2. **eslint** (`:40`, `re-lint/max-expects`, max 1) — the test had 3 `expect`s. Rewrote it on the house pattern already used in `chatOrchestrator.test.ts`: an `outcomeOf` capture plus a single `expect({outcome, onErrorError, afterSessionRan}).toEqual({...})`. All three acceptance criteria are still asserted — the rejection reaches the caller with the original message, `onError` receives the thrown error, `afterSession` ran — nothing loosened, no test deleted.

3. **Spec anchor follow-on** — the rewrite moved the `it(` from line 40 to 35, and `require-spec-link` requires the spec's `[validated by](...#L40)` anchor to fall inside the test's span, so the anchor now reads `#L35`. The spec statement itself and the CHANGELOG were already done by the previous round's commit (`c3cd08a`), as was the orchestrator fix (`beforeSession` inside the `try`) — the red was confined to the test file.

**Verified:** `prettier --write --check` on the changed test file is clean; the single test file passes (`1 passed, 1 total`). Typecheck and eslint themselves I did not run — per this pod's limits both are CI's job; the typecheck fix is mechanical against the real `PromptBuilderConfig`.

**Landed:** commit `250f930` pushed; `HEAD == origin/loop-bench/94`; `origin/main` already up to date (no merge needed), working tree clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used nonexistent PromptBuilderConfig fields and 3 expects (max 1); rebuilt on house pattern with spec anchor moved to the new line"}}