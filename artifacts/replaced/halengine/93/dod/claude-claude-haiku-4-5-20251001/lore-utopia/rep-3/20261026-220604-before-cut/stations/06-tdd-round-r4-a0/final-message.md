Branch is pushed and up to date. The fix:

- **Root cause**: spec.md line 28 was a compound bullet with the `([validated by: accumulates usage...](L50))` link mid-sentence, followed by ". The field-by-field summation...". The spec-links checker requires each validation link to be at the *trailing* parenthetical of its statement. The ESLint `require-spec-link` rule consequently found no valid spec link for the test at L50.

- **Fix**: Split that single bullet into two — each statement now ends with its own `([validated by: ...])` link, satisfying both checkers. Verified locally with `check-spec-links.mjs` (0 misplaced, 1642 statements scanned).

- **Regressions**: 0 tests written this round (mechanical fix, CI was the judge).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix misplaced spec citation causing eslint and spec-links failures","tdd_next":"acceptance green"}}