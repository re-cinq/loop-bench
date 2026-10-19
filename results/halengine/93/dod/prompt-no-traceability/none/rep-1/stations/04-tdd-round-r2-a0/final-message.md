Branch is up to date. The push landed. The untracked `.coverage-check*/` directories are just local coverage runs that aren't committed.

**What changed:** Fixed three categories of CI failures from the previous round's push:
1. `re-lint/no-flag-params` + `re-lint/no-duplicate-code`: split `toolRoundChunks(id, boolean)` into `toolRoundChunksWithUsage`/`toolRoundChunksWithoutUsage`, and extracted a `runAndCaptureUsage` helper
2. `re-lint/require-spec-link` + `check:spec-links` (spec-link placement): the spec had one giant bullet where the validated-by links were not in a trailing parenthetical — split into two bullets, each ending with `(links)`, and fixed the test line numbers (L65→L73, L75→L78)
3. Rotten anchor: `#L148` was pointing to a blank line; corrected to `#L149` where `afterModelResponse` actually is

**Unrelated smells noticed (not acted on):** The `test` CI failure may also be a coverage floor issue in `src/orchestration/` — if the full suite's coverage fell below `functions: 92%`, that will show on this push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair: no-flag-params, no-duplicate-code, spec-link placement, rotten anchor","tdd_next":"acceptance green"}}