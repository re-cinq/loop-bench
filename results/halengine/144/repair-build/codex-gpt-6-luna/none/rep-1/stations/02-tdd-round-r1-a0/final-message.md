Branch is pushed and up to date. The round fixed:

1. **`ConnectionHandlerDeps.handleMessage`** — changed `ws: WebSocket` to `ws: ExtWebSocket` so the interface matches the actual implementation (which needs `ws.userId`)
2. **`messageHandler.test.ts` and `beforeToolCall.test.ts`** — updated mock `ws` casts from `WebSocket` to `ExtWebSocket`  
3. **Spec anchor citations** — reanchored 110 drift points across `hal-engine-conversation-list`, `hal-engine-session-resume`, `hal-engine-websocket-protocol`, `hal-engine-abandon-on-close`, `hal-engine-commit-open-entries`, `hal-engine-single-terminal-frame`, `hal-engine-tool-budget`, and `hal-engine-tool-executor-throw` specs
4. **New unit test** — added `list_sessions` describe block in `messageHandler.test.ts` verifying that `createMessageHandler` calls `listFor` with the socket's `userId` and returns `session_list` with ISO-formatted dates; all 55 tests green

Smells noticed but not acted on: the double logging when `listFor` rejects (`'ws'` category in `answerFrame` then `'message'` in `wsErrorHandler`) is redundant but not broken.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle list_sessions in messageHandler.ts (facets 3 and 4 closed, typecheck/spec-names CI failures fixed)","tdd_next":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md"}}