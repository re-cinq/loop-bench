Fixed the 4 `re-lint/no-duplicate-code` ESLint failures in `src/transport/ws/messageHandler.test.ts` (without modifying `src/transport/conversationList.acceptance.test.ts`) by using `captureErrors()` from `src/shared/logCaptureTestSupport.ts` and `jest.fn` with distinct fixture data, then updated shifted line anchors in `specs/hal-engine-conversation-list/spec.md` via `npm run spec:names:fix`.

- Ran `src/transport/ws/messageHandler.test.ts`: 58 passed, 0 failed (0 red tests authored, 0 regressions).
- Ran `npx prettier --write src/transport/ws/messageHandler.test.ts`, `npm run spec:names`, `npm run check:spec-links`, `npm run check:spec-status`, and `node scripts/repoint-spec-anchors.mjs --check origin/main` (all passed).
- Committed `9d1bac1` and pushed to `origin/loop-bench/144` (already up to date with `origin/main`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix eslint no-duplicate-code failures in src/transport/ws/messageHandler.test.ts","tdd_next":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md"}}