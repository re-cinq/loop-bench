Branch is pushed and up to date. This round fixed all 12 ESLint errors from CI and added the missing CHANGELOG entry:

- **`validation.ts`**: replaced 3-way `switch` with a lookup table (`prefer-polymorphism`), extracted `validateLimitField` and `validateBeforeField` helpers to eliminate four nested-if violations
- **`wsTestSupport.ts`**: exported `eventually`, `delegatingTo`, and `stopGracefully` as shared utilities
- **`conversationList.acceptance.test.ts`**: removed local duplicates, imported shared utilities, fixed the `prefer-early-return` in the message handler callback
- **`sessionResume.test.ts`**: removed local duplicates (the other side of all three `no-duplicate-code` pairs), imported shared utilities
- **`CHANGELOG.md`**: added the `list_sessions` / `session_list` frame entry under `[Unreleased]`

0 regressions introduced — the removed code was purely duplicate definitions; the imported replacements are identical in behavior. The remaining unchecked facet is spec documentation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ESLint and changelog CI failures (12 lint errors + missing CHANGELOG entry)","tdd_next":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md"}}