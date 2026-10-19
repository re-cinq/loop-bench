Branch is clean and pushed. Summary of this round:

**Fixed 6 CI failures** (all from eslint + spec-names checks on the previous round's work):
- `re-lint/prefer-early-return`: removed `else` branch in provider factory — used early `return` instead
- `re-lint/no-duplicate-code` (×2): extracted `makeRoundProvider` helper to eliminate 18-line and 10-line code duplications between tests 1 and 3
- `re-lint/max-comment-lines`: removed the 2-line comment before the first expect
- `re-lint/require-spec-link` (×2): added spec statements to `specs/hal-engine-config-hooks/spec.md` for the two tests that lacked citations; ran `check-spec-anchor-names --fix` to repoint all three citations to correct line numbers
- `spec-names` check: fixed by `--fix` (first test's citation had stale line number L30 → now L52)

**Unrelated smell noticed**: the `afterModelResponse` hook parameter is still named `usage` (not `totalUsage`) — that's the remaining unchecked DoD facet.

0 regressions. 0 new tests (this round fixed CI failures, not a new TDD facet).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint and spec-names CI failures (duplicate code, prefer-early-return, max-comment-lines, require-spec-link, stale spec anchor)","tdd_next":"rename afterModelResponse hook parameter usage→totalUsage for type clarity"}}