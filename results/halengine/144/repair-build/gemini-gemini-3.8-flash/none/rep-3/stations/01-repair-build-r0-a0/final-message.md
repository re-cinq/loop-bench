Fixed all reported CI failures:
- Fixed `re-lint/no-duplicate-code` between `src/transport/conversationList.acceptance.test.ts` and `src/transport/sessionResume.test.ts` by removing `eventually`, draining sockets with `closeServer` in `afterEach`, and replacing `delegatingTo` with `bareStore`.
- Fixed `re-lint/prefer-early-return` in `askAfterConnect` by guarding non-connected frames early.
- Fixed `re-lint/no-flag-params` in `src/transport/ws/validation.test.ts` by using an array literal instead of `.fill(false)`.
- Resolved failing acceptance tests by threading `sessionStore` into `createMessageHandler` in `src/transport/createServer.ts` and implementing `handleListSessions` in `src/transport/ws/messageHandler.ts`.
- Repointed spec anchor citations in `specs/hal-engine-conversation-list/spec.md`.
- Verified formatting with `npm run prettier:check`, spec links with `npm run check:spec-links`, anchor names with `npm run spec:names`, and test suite with `npm test`.
- Committed and pushed to `origin/loop-bench/144`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed eslint findings and implemented list_sessions frame handling in createMessageHandler"}}