All four facets in the DoD are already ticked `[x]`. The CI failures from the round brief are now fixed:

1. **`re-lint/no-duplicate-code`** (lines 528 and 553): Extracted `captureUsageFrom` helper, refactored both tests to use it — duplication eliminated.
2. **`re-lint/require-spec-link`** at `chatOrchestrator.test.ts:578` ("resolves processMessage..."): The stale `hal-engine-tool-input-validation` spec link pointed to `#L550` instead of `#L566` — `--fix` corrected it.
3. **`re-lint/require-spec-link`** at `chatOrchestrator.usage.acceptance.test.ts:73` and `:83`: Added `[validated by: ...]` citations to `specs/hal-engine-config-hooks/spec.md`.
4. **`spec-names` check failure**: Same stale `#L550` in `hal-engine-tool-input-validation` — fixed by `--fix`.

0 regressions caused (no existing tests were modified, only refactored).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix lint failures: no-duplicate-code, require-spec-link (3 tests), spec-names check","tdd_next":"acceptance green"}}