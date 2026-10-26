This round is blocked, and I did not reach the spec or CHANGELOG facets.

**What I did**
- Read the round brief: CI on `7967e2b` was red for typecheck, eslint, spec-names and changelog.
- The spec-names drift and the four `require-spec-link` lint errors on existing tests in `chatOrchestrator.test.ts` were the same problem. Inserting coverage moved those tests down, so 12 spec citations pointed at stale lines. I ran the repo's own `scripts/check-spec-anchor-names.mjs --fix`, which repointed 11 citations in `specs/hal-engine-architecture/spec.md` and 1 in `specs/hal-engine-tool-input-validation/spec.md`. The checker now passes.
- I did not run prettier on the spec markdown. It added unrelated blank lines, and `prettier:check` only covers `.ts` under `src`, `scripts` and `smoke`, so it isn't needed. I reverted that churn and kept only the link changes.
- Committed as `33b1307` and pushed to `loop-bench/94`. `origin/main` was already merged in, and the branch is not ahead of its upstream.

**What is stuck**
- `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` is wrong in two places. Line 30 passes `baseSystemPrompt` to `PromptBuilderConfig`, which has no such field (the field is `identity`). Line 40 has three `expect` calls, and the lint rule allows one. Both are CI typecheck and eslint findings in the acceptance test itself. I may not edit an acceptance test, so these stay red until the test is corrected.

**Not verified here**
- No tests, typecheck or eslint ran in this pod this round. I ran only the spec-names step. The lint fix for the four existing tests is inferred from the repointed links landing on the lines the lint error named. CI will confirm it.

**Red test count**
- Red tests I wrote: 0.
- Red tests that are the ticket's acceptance test: 2 findings (typecheck and lint), both caused by the test file itself.
- Regressions from my branch: 12 spec-names citations and 4 lint `require-spec-link` errors. All came from the line shift and are repointed in `33b1307`.

**Still open**
- Facet "update `specs/hal-engine-config-hooks/spec.md`" is not closed. The "Measured semantics" section still says this issue changes none of these properties.
- Facet "CHANGELOG" is not closed.
- `.lore/dod.md` is unchanged, so no box is ticked.
- Unrelated smells, not acted on: none noticed this round.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"acceptance test chatOrchestrator.beforeSession.acceptance.test.ts is wrong: baseSystemPrompt is not a PromptBuilderConfig field (typecheck line 30) and it has 3 expect calls (eslint max 1, line 40); it must be corrected before the round can go green"}}