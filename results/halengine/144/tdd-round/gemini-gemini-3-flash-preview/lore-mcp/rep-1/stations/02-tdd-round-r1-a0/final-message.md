I have completed the requested TDD round for ticket #144. 

First, I resolved the CI failures from the previous round in `src/transport/ws/conversationList.test.ts`. This involved migrating the tests from Vitest to Jest, narrowing the `ValidationResult` union type to fix TypeScript errors, and consolidating assertions to comply with the `max-expects` lint rule. I also updated `specs/hal-engine-conversation-list/spec.md` with the required traceability links and test names, ensuring that `npm run spec:names` passes.

Next, I implemented the "Thread `sessionStore` and Handle `list_sessions`" facets:
- **Foundations:** Added the `UNSUPPORTED` error code to `src/types/session.ts` and the `transport.history` opt-in to `HalEngineConfig`.
- **Threading:** Updated `createMessageHandler` to accept `sessionStore` and `history` options, and wired them through `createServer` and `createHalEngine`.
- **Handling:** Implemented `handleListSessions` in `src/transport/ws/messageHandler.ts`. It correctly verifies the history opt-in, calls `sessionStore.listFor` for the authenticated user, and serializes the result with ISO-8601 strings. It also includes error handling that logs to the `ws` category as required by the acceptance criteria.
- **Verification:** I added a new unit test file `src/transport/ws/listSessions.test.ts` to verify the handling logic and error/logging behavior.
- **Documentation:** I extended `specs/hal-engine-websocket-protocol/spec.md` with sections for the `list_sessions` and `session_list` frames, including field tables and examples.

I ran Prettier over all modified files and confirmed that the new unit tests pass. I also merged `main` into the branch to ensure no conflicts.

The remaining work includes updating `example/full-config.ts` and regenerating `docs/getting-started.md` to include the conversation list feature.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle list_sessions in src/transport/ws/messageHandler.ts","tdd_next":"Update docs/getting-started.md via example/full-config.ts"}}