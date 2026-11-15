Completed one TDD red-green-refactor round for `list_sessions` frame validation:

- Added `ListSessionsMessage` to `src/types/messages.ts` and included it in `IncomingMessage`.
- Implemented `validateListSessionsMessage` (with `parseOptionalLimit`, `parseOptionalBefore`, and `isValidTimestamp`) in `src/transport/ws/validation.ts` to accept optional non-negative integer `limit` and optional `before` (`1`–`128` char `sessionId` and finite timestamp string or number) while stripping unknown fields such as `userId`.
- Added unit tests in `src/transport/ws/validation.test.ts` (observed RED before implementation, then GREEN with 5/5 passing after formatting with Prettier).
- Linked the new unit tests in `specs/hal-engine-conversation-list/spec.md`, ticked the validation facet in `.lore/dod.md`, committed (`35923a7`), pushed to `origin/loop-bench/144`, and verified `origin/main` is already up to date.
- Test verdict: 1 new red test suite failure authored this round (resolved to 5/5 passing in `src/transport/ws/validation.test.ts`), 0 regressions observed locally (acceptance tests, linter, and typechecker were not run here per pod rules).
- Unrelated notes observed: `ticket.md` mentions `sessions_list` / `sessions_list_result` whereas `.lore/dod.md`, `specs/hal-engine-conversation-list/spec.md`, and `src/transport/conversationList.acceptance.test.ts` specify `list_sessions` / `session_list`; `CHANGELOG.md` will also need an `[Unreleased]` update before PR merge since `src/` changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Add SessionSummaryFrame and SessionListMessage to src/types/messages.ts and re-export list_sessions types from src/index.ts"}}