Completed one red-green-refactor round for `list_sessions` frame validation (committed as `5a4fa03` on `loop-bench/144`, merged cleanly with `origin/main`, and pushed).

### Summary
- **RED:** Added three tests to `src/transport/ws/validation.test.ts` covering valid `list_sessions` frames (bare, `limit`, `before` with ISO/epoch `updatedAt`, stripping unknown fields like `userId`), invalid `limit` values, and invalid `before` cursors; ran `src/transport/ws/validation.test.ts` and observed the expected failure (`Unknown message type: list_sessions`).
- **GREEN:** Added `ListSessionsMessage` to `IncomingMessage` in `src/types/messages.ts` and implemented `validateListSessionsMessage` (with the ADR-006 `re-lint/prefer-polymorphism` suppression on the three-case `switch`) in `src/transport/ws/validation.ts`; re-ran `src/transport/ws/validation.test.ts` (6/6 passed).
- **REFACTOR & TRACEABILITY:** Verified formatting with `npx prettier --write`, added `[validated by: ...]` citations in `specs/hal-engine-conversation-list/spec.md` (`#L24`, `#L49`, `#L57`), updated `CHANGELOG.md` under `## [Unreleased]`, ticked the validation facet in `.lore/dod.md`, and re-ran `src/transport/ws/validation.test.ts` (6/6 passed; 0 red tests of ours, 0 regressions observed locally; acceptance tests and full suite were not run per pod rules).

### Unrelated observations (left untouched)
- `specs/hal-engine-conversation-list/spec.md` lines 74–76 cite `src/transport/conversationList.acceptance.test.ts` at `#L87`, `#L129`, and `#L161`, whereas those `it(...)` declarations are on lines 93, 134, and 163.
- `ticket.md` names `list_conversations` / `conversation_list`, while `.lore/dod.md`, `specs/hal-engine-conversation-list/spec.md`, and `src/transport/conversationList.acceptance.test.ts` use `list_sessions` / `session_list`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Add SessionSummaryFrame and SessionListMessage to src/types/messages.ts and re-export list_sessions/session_list types from src/index.ts"}}