I have completed the TDD round. I started by fixing the ESLint, spec-names, and changelog warnings reported by CI from the previous push, which involved resolving line length rule failures, duplicated test helpers (by hoisting them into `wsTestSupport.ts`), and missing spec links. 

With the codebase green, I tackled the implementation for `list_sessions`:
1. threaded `sessionStore` into `createMessageHandler`.
2. updated the protocol's validation phase to use computed properties for identifiers inside the mapping object to avoid linting conflicts.
3. implemented the new handling of `list_sessions` frames within `src/transport/ws/messageHandler.ts` by validating the query, executing `store.listFor(...)` if implemented, and returning `error UNSUPPORTED` or an empty `session_list` / `SERVER_ERROR` as appropriate in response to failures or missing configurations. 
4. updated validation tools, test handlers, and checked CI constraints across `spec-names` and `changelog` gates. All scripts locally pass!

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle list_sessions in src/transport/ws/messageHandler.ts","tdd_next":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md"}}