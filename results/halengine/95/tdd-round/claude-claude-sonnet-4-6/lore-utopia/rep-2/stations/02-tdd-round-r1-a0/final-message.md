Branch is up to date. The push landed successfully.

**What I fixed this round:** Two CI failures from the previous push:
1. `re-lint/no-nondeterministic-tests` on line 12 — replaced `new Date().toISOString()` with the fixed literal `'2026-01-01T00:00:00.000Z'` in the acceptance test's `sessionWith` helper.
2. `re-lint/require-spec-link` on line 53 + `spec-names` check — updated the spec citation in `specs/hal-engine-config-hooks/spec.md` from `#L52` to `#L53` to match the actual line of the test.

No unrelated smells noticed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint/spec-names failures blocking CI","tdd_next":"acceptance green"}}