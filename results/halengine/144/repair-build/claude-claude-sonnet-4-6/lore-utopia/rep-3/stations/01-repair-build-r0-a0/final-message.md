Branch is up to date. All fixes are pushed.

**Summary of changes:**

1. **`messageHandler.ts`** — Added `sessionStore: SessionStore` param to `createMessageHandler`, made `answerFrame` async with session/store args, added `handleListSessions` that returns `session_list` frames (empty list when no `listFor`, error on throw, ISO-serialized dates on success).

2. **`createServer.ts`** — Passed `options.sessionStore` to `createMessageHandler`.

3. **`wsTestSupport.ts`** — Exported `eventually`, `delegatingTo`, and `stopAllEngines` to eliminate duplicated test utilities.

4. **`conversationList.acceptance.test.ts`** — Imported shared utilities, removed local duplicates, fixed `prefer-early-return` by inverting the `connected` frame guard.

5. **`sessionResume.test.ts`** — Imported shared utilities, removed local `eventually` and `delegatingTo`, updated afterEach to use `stopAllEngines`.

6. **`validation.test.ts`** — Extracted `{updatedAt: true, ...}` to a named variable `beforeWithBoolUpdatedAt` to fix `no-flag-params` lint error.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions frame unhandled (no sessionStore wired) + 7 duplicate-code and lint errors in test files"}}