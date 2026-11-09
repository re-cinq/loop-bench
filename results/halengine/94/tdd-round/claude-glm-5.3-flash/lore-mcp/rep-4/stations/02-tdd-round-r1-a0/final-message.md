Branch is in sync with `origin/main` and pushed — `git status` reports it neither ahead nor behind its upstream, so CI will get the push.

## Round summary

CI's verdict on `d161581` named three failed checks; every finding is repaired:

- **typecheck** — the test built `PromptBuilder` with `baseSystemPrompt`/`systemPromptSuffix`/`contextConfig`, none of which exist on `PromptBuilderConfig` (whose only required field is `identity`). Now `new PromptBuilder({identity: 'You are HAL.'})`, matching how every other test in the repo constructs it.
- **eslint `max-expects`** — the acceptance test carried 3 `expect` calls. Split into three tests (`propagates a beforeSession throw to the caller as a rejection`, `hands onError the error a beforeSession threw`, `runs afterSession when beforeSession throws`), each with exactly one; every original assertion survives, including the `toBe` identity check on the `onError` argument.
- **eslint `require-spec-link` + `spec-links` + status coverage** — one root cause: the spec's citation sat mid-statement with prose after it, so the shared parser counted it as misplaced — not coverage, and not a link to the test. The bullet is now three statements, each ending in its trailing `([validated by: …](…#Lnn))`, anchored at the `it(` lines 55/63/72 with exact test names. That simultaneously restores `Shipped` = full coverage, links all three tests, and clears the misplaced-citation report — verified with the repo's own gate: `node scripts/check-spec-links.mjs specs/hal-engine-config-hooks/spec.md` → `misplaced: 0`, and `check-spec-anchor-names` → all 9 citations name the test they point at.

`.lore/dod.md` records the closed facet; the "Done when these pass" box stays unticked for CI to judge. `chatOrchestrator.ts`, the CHANGELOG, and all pre-existing tests are untouched, so the non-throwing `beforeSession` path stays pinned unedited.

**This round ran no tests here**: the file is the acceptance test `.lore/dod.md` names, which this pod refuses by name — and neither `eslint` nor `tsc --noEmit` may run locally (OOM-bounded in this pod), so the three repaired checks are proven by reading the rule sources and running only the cheap `check:spec-links`/anchor-name scripts. Red tests attributable to this work: none were assertion failures — the previous verdict was lint/type findings on my own test file; zero regressions (no existing test or source file was modified).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair the red build from d161581 — PromptBuilderConfig shape, one expect per test, trailing spec citations","tdd_next":"acceptance green"}}