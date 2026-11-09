Completed one TDD round for #144:

- **Red phase:** Added unit test in `src/transport/ws/validation.test.ts` for validating `list_sessions` frames (optional non-negative integer `limit`, optional `before` cursor with 1–128 character `sessionId` and valid date `updatedAt`, dropping unrecognized fields such as `userId`). Observed failure (1 red test of ours, 0 regressions).
- **Green phase:** Implemented `validateListSessionsMessage` in `src/transport/ws/validation.ts` to validate the frame and strip extra fields. Verified that all tests in `src/transport/ws/validation.test.ts` pass.
- **Refactor & Formatting:** Formatted modified files with Prettier, verified spec anchor checks (`npm run spec:names`, `npm run check:spec-links`, and `npm run check:spec-status`), updated `.lore/dod.md`, committed, and pushed to origin.

Unrelated smells noticed: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts (optional non-negative integer limit; optional before object with 1–128 char sessionId and finite-date updatedAt string or number; strip unknown fields like userId).","tdd_next":"Thread sessionStore into createMessageHandler (optional parameter so existing 1-arg and 2-arg callers keep working) and wire it in src/transport/createServer.ts."}}