Branch is up to date. Summary of what was fixed:

- **`re-lint/callee-below-caller`**: Moved `createSession` and `createMockProvider` to below `runWithThrowingBeforeSession` (their sole caller), satisfying the rule that callees must appear after callers.
- **`re-lint/require-spec-link`**: Added three new `[validated by: ...]` citations in the spec at lines L61, L67, L75 — one for each `it()` declaration — so each test's line falls within a cited range.
- **`spec-names`**: Renamed the describe block from `'beforeSession throwing'` to `'runs onError and afterSession when beforeSession throws'` (matching the spec citation name), and updated the spec reference from the stale `#L40` to `#L60` (the describe block's current line).

No unrelated smells noticed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint (callee-below-caller, require-spec-link) and spec-names failures in acceptance test","tdd_next":"acceptance green"}}