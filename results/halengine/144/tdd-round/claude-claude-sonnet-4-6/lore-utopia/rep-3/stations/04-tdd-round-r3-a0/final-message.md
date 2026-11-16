Pushed successfully. Summary of what was fixed across 4 files:

- **`conversationList.acceptance.test.ts`**: Flattened nested `if (pong)` inside `if (type !== 'connected')` by pulling the pong guard out first
- **`validation.ts`**: Replaced 3-way switch with a lookup table (`prefer-polymorphism`); extracted `limitError`/`beforeError` helper functions to eliminate nested ifs; renamed local variable `data` → `sessionMsg` (`no-vague-names`)
- **`validation.test.ts`**: Wrapped the `it.each` in `describe('rejects malformed list_sessions frames', ...)` so the spec-names checker's DECLARATION regex can find it
- **`specs/hal-engine-websocket-protocol/spec.md`**: Split the compound sentence at line 191 into three separate sentences so each `([validated by: ...])` citation sits at the end of its statement (fixes both `spec-links` and the ESLint `require-spec-link` for the test at L26); updated the malformed-frame citation to the new describe name

No regressions introduced: 14/14 validation unit tests pass; both spec checks pass.

Unrelated smell noticed but not touched: the `ValidationSuccess` interface uses `data` as the property name — that's the wire shape and cannot be renamed without breaking callers.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all CI lint/spec failures from round-brief (eslint nested-if, prefer-polymorphism, no-vague-names, require-spec-link; spec-names and spec-links)","tdd_next":"acceptance green"}}