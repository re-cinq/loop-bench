Round ended blocked. The code and docs are pushed, but CI will stay red on the acceptance test file, which I did not edit.

**What I did**
- **Changelog** (CI `changelog` finding): added a `### Changed` entry under Unreleased. It covers the new behaviour (`onError` and `afterSession` now run for a `beforeSession` throw, and the session store's save also runs now) and a migration note for consumers. It passes `scripts/check-changelog.sh` on the committed branch.
- **Spec** (`specs/hal-engine-config-hooks/spec.md`): moved the `beforeSession` statement out of "out of scope" into a new section, "A throw from `beforeSession`". It records the decision that `afterSession` runs after a failed `beforeSession`. It also says `afterSession` is not told whether the turn started, and that `onError` is the only hook that receives the failure. The rejection is still validated by the acceptance test link, which points at its line 40.
- **Lint `require-spec-link` findings** (4 in `chatOrchestrator.test.ts`): these came from the CI run on `7967e2b`. The local commit `33b1307`, which repoints those links, was never pushed. It is now on the branch. `check-spec-links.mjs` reports 0 misplaced.
- **spec-names**: `check-spec-anchor-names.mjs` passes locally (588 citations).
- Ticked the two facets in `.lore/dod.md`, and added an unchecked facet for the acceptance test defects.
- Pushed `32e391f` to `loop-bench/94`. Branch is in sync with upstream. `origin/main` merge produced nothing new.

**What I did not do**
- **Typecheck and eslint remain red, and I did not fix them.** Both come from `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:
  - The fixture passes `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig` to `PromptBuilder`. `PromptBuilderConfig` only has `identity`, `domainContext`, `responseGuidelines` and `toolPreamble`, so the test is built against an API that does not exist.
  - Its single `it` has 3 `expect` calls against a max of 1.
  - The brief says never to edit an acceptance test, and to stop and say so when one is wrong. Fixing the fixture would mean changing a test someone else owns, so the test author needs to decide.

**Tests and regressions**
- No tests were run in this pod. This round wrote no new test, since the remaining facets are documentation.
- Red tests I wrote: 0. Regressions I caused: none identified. CI's verdict only named lint and typecheck findings, and the lint findings on the other tests are addressed by the repoint commit.
- `lore_get_ci_failures` returned 403 Forbidden, so I worked from the truncated CI failure list in `round-brief.md`.

**Unrelated smells, not acted on**
- The `instanceof Error` gate on `onError`, which the ticket puts out of scope.
- `afterModelResponse` receives only the last round's usage.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"acceptance test chatOrchestrator.beforeSession.acceptance.test.ts is wrong: it passes non-existent PromptBuilderConfig keys (baseSystemPrompt, systemPromptSuffix, contextConfig) and has 3 expects against max-expects 1; typecheck and eslint stay red until its author fixes it"}}