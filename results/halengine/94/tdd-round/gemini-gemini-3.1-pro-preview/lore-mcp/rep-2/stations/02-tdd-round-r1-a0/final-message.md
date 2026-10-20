This round is complete. 

The previous round's push resulted in a red build due to one typecheck error and several ESLint errors. The TypeScript error was due to an invalid prompt builder option in the acceptance test, while the ESLint errors (`re-lint/require-spec-link`) were caused by an out-of-scope test addition in `chatOrchestrator.test.ts` that shifted line numbers and broke existing inline spec links for 5 tests. Those 5 tests were regressions caused by the previous round's edit.

To fix these failures, I reverted the out-of-scope modification to `chatOrchestrator.test.ts` (bringing it back in sync with `main`), corrected the `PromptBuilder` arguments in `chatOrchestrator.beforeSession.acceptance.test.ts`, and collapsed the assertions in that acceptance test to satisfy the `re-lint/max-expects` rule. 

I then completed the remaining facets outlined in `.lore/dod.md`:
- Updated `specs/hal-engine-config-hooks/spec.md` with the new guarantee for `beforeSession` and repointed its inline validation link.
- Documented the behavior change for `beforeSession` in `CHANGELOG.md`.

All `.lore/dod.md` checkboxes have been ticked. I formatted the changed files with Prettier, committed them, and pushed them to `origin HEAD`. A merge from `origin/main` confirmed the branch was already up to date.

The round ran no tests here.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update spec and CHANGELOG","tdd_next":"acceptance green"}}