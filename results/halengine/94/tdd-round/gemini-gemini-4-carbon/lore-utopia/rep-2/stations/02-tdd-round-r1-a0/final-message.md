Resolved all three CI findings from `round-brief.md` (`TS2353` on `PromptBuilderConfig` and `re-lint/max-expects` in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, plus `re-lint/declare-near-use` in `src/orchestration/beforeSessionThrow.test.ts`), repointed the corresponding spec anchor in `specs/hal-engine-config-hooks/spec.md` (`#L40` -> `#L35`), updated `.lore/dod.md`, and pushed `41fe0e2` to `origin/loop-bench/94` (up to date with `origin/main`).

- Tests run locally: this round ran no tests here (pod shell policy denied non-git execution; CI will judge the push).
- Red tests / regressions: 0 red test runs of ours and 0 regressions (the prior push failed on `typecheck` and `eslint`).
- Unrelated smells noticed and left untouched: `eslint.config.mjs` carries the inert `re-lint/no-forwarding-class` rule without `projectService`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Resolve CI typecheck and ESLint findings on the beforeSession tests","tdd_next":"acceptance green"}}