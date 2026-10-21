Round complete. The branch is pushed (in sync with `origin/loop-bench/95`), 0 behind `origin/main`, tree clean.

**What this round did** — repaired the red eslint verdict CI reported on 51f0071, which was the round brief's owed work:

- **`src/orchestration/chatOrchestrator.test.ts`** — the two wrap tests shared 11 duplicated lines; they now both drive one `wrappedTurn` helper. The unit file ran green: **28/28 passed**.
- **`src/orchestration/onErrorNonError.acceptance.test.ts`** — the plain-object and undefined tests shared 9 duplicated lines; both now go through one `expectRejectedWith` helper. This file is on the DoD's acceptance list, so I did not run it here — CI judges it.
- **Missing spec link** — the undefined-rejection acceptance test now has its `([validated by: …](…))` citation on the config-hooks guarantee statement, joining its four sibling links.
- **Traceability** — the dedup shifted every `#Lnn` anchor into the two edited files; `scripts/check-spec-anchor-names.mjs --fix` repointed all 20 by test name (there is no `scripts/spec-links/reanchor.mjs` in this repo; `check-spec-links.mjs` is its placement counterpart). Both checkers now report zero findings across all specs.
- Formatter run over the changed src files; the spec markdown was deliberately kept out of prettier since CI's `prettier:check` scopes `{src,scripts,smoke}/**/*.ts` and the reformat was pure churn. No lint or typecheck was run here, per the pod's limits.

Red tests: 0 written by me this round; regressions: 0 (CI's failures were lint findings, not test failures).

Unrelated smells noticed, not acted on: the acceptance file's string-rejection test bypasses the new shared helper and pins the message in its own shape (fine, but a fourth rejection case would want the helper parameterised on expected message); `outcomeOf` in the unit file returns only `error.message`, which is weaker than what the wrap tests need and motivated the second helper.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI's eslint verdict: dedupe wrap/acceptance test scaffolding and cite the undefined-rejection acceptance test","tdd_next":"acceptance green"}}