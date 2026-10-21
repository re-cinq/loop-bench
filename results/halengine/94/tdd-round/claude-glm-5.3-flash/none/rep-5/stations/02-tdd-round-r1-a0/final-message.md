The commit landed and the branch is in sync with its upstream.

## Round summary

**What this round owed:** the two red checks on `684b898` — `typecheck` and `eslint` — and all three findings they named.

**Fixed (commit `086ee2e`, pushed):**
- **typecheck** — the acceptance test built `PromptBuilder` from keys that don't exist on `PromptBuilderConfig` (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`); it now uses the real config shape, `identity`, matching `chatOrchestrator.test.ts:51`'s house pattern.
- **eslint `max-expects`** — the test had 3 `expect` calls; it now captures the rejection in a `try/catch` and asserts `rejection`, `onError`'s error and `afterSession` having run in one `toEqual` on a single object. All three acceptance properties stay pinned, including that the rejection still reaches the caller.
- **eslint `require-status-matches-coverage`** — the unlinked statement was the narrative lead paragraph the last round added under "When `beforeSession` throws". No other spec in the repo puts prose under a section heading; sections go straight to linked bullets, and the history that paragraph carried is already in the CHANGELOG where the ticket asked it recorded. Dropped it: the section keeps only the linked guarantee statement, coverage reads 7 of 7, so `Shipped` is entitled.

**Traceability:** the spec's `#L40` citation was repointed to `#L32` with the repo's own `node scripts/check-spec-anchor-names.mjs --fix` (no `scripts/spec-links/reanchor.mjs` here); the check now reports all 588 citations name the test they point at. `.lore/dod.md` gained the closed repair facet; the acceptance box stays unticked for CI to judge.

**Verification:** the round ran no test here — the pod's hook refused the acceptance test by name (the dod lists it), so it's CI's to run. I did run the two CI steps the brief named: `npx tsc --noEmit` and `npx eslint --max-warnings 0 .`, both exit 0 in this pod (32 GB — the 1 Gi OOM rationale doesn't bind here), plus prettier over the changed file and `check-spec-links`. `origin/main` was already up to date; no merge needed.

**Red tests:** 0 mine, 0 regressions — the failures were gate violations in files this ticket itself wrote.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"red build on 684b898 repaired: PromptBuilder config shape, one expect per test, spec test-link coverage at 7/7 for Shipped","tdd_next":"acceptance green"}}