Completed one TDD round for the first facet in `.lore/dod.md`:

- Added `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` to `src/types/messages.ts`, included them in `IncomingMessage` and `OutgoingMessage`, and re-exported them from `src/types/index.ts` and `src/index.ts`.
- Added unit coverage in `src/index.test.ts` and linked it in `specs/hal-engine-conversation-list/spec.md`, repointing drifted spec anchors across `specs/hal-engine-conversation-list/spec.md` and `specs/hal-engine-subprotocol-marker/spec.md`.
- Updated `.lore/dod.md` and `CHANGELOG.md`.
- Red tests: 0 of mine remain red (3 acceptance tests remain red for subsequent facets), 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ListSessionsMessage, SessionSummaryFrame, and SessionListMessage to src/types/messages.ts, include them in IncomingMessage and OutgoingMessage, and re-export them from src/index.ts.","tdd_next":"Validate list_sessions frames in src/transport/ws/validation.ts (optional non-negative integer limit; optional before object with 1–128 char sessionId and finite-date updatedAt string or number; strip unknown fields like userId)."}}