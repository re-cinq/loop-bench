Branch is clean and up to date. The round fixed all named CI failures:

**What this round did:**
- Extracted `runAndCapture` helper in the acceptance test to eliminate the 12-line duplicate code block (`re-lint/no-duplicate-code`)
- Split the `sumUsage` test with 2 `expect` calls into two single-expect tests (`re-lint/max-expects`)
- Added spec statements and validated-by links in `specs/hal-engine-config-hooks/spec.md` for the two new `sumUsage` undefined-handling behaviors (`re-lint/require-spec-link`)
- Updated 4 stale line numbers in architecture spec (`#L386→#L392`, `#L428→#L407`, `#L449→#L428`, `#L440→#L419`) that were causing both `require-spec-link` and `spec-names` failures
- Updated 5 acceptance-test line numbers in config-hooks spec after the refactoring shifted test positions

**Tests this round:** 13 passed (5 acceptance + 8 orchestratorHelpers), 0 regressions.

**Unrelated smell noticed (not acted on):** Architecture spec has ~13 pre-existing stale spec links (hooks tests shifted by 6 lines, e.g., `#L106` for a test at `L112`). These pass CI currently because neighboring spec mentions fall within the test body range, but they're technically wrong. A future round could clean them up with `scripts/spec-links/reanchor.mjs` if that script gets added.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI lint failures: duplicate code, missing spec links, stale spec line numbers","tdd_next":"acceptance green"}}