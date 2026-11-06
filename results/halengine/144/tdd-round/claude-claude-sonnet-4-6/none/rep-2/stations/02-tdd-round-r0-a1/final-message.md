Pushed and confirmed clean. 

Summary: This round closed facets 3 and 4 — threaded `sessionStore` as an optional second argument into `createMessageHandler`, wired it through `createServer.ts`, and added `handleListSessions` to dispatch `list_sessions` frames off the lock: calls `listFor(session.userId, {limit, before})`, serialises `Date` fields to ISO strings, returns `session_list`, and logs `SERVER_ERROR` on rejection. All 56 unit tests pass. CI will run the acceptance tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"handle list_sessions in messageHandler (facets 3+4)","tdd_next":"acceptance green"}}