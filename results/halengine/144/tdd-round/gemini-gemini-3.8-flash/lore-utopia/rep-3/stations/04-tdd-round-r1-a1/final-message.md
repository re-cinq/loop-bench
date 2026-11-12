In this round, I resolved the remaining CI findings from `round-brief.md`:
- Restored the `// eslint-disable-next-line re-lint/prefer-polymorphism -- discriminated-union narrowing on an untrusted frame (adrs/ADR-006-lint-suppressions.md)` suppression on `validateMessage` in `src/transport/ws/validation.ts` as mandated by ADR-006 now that a 3rd case (`list_sessions`) is present.
- Verified that all unit tests in `src/transport/ws/validation.test.ts` pass (6/6).
- Checked that spec anchors, status checks, and changelog gates are satisfied.
- Formatted changed files with prettier, committed, merged `origin/main`, and pushed to `origin/loop-bench/144`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Restore prefer-polymorphism suppression on validateMessage per ADR-006 and resolve CI lint findings","tdd_next":"acceptance green"}}