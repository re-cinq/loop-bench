Defined the executable Definition of Done for `#144` under strategy `direct` and pushed commit `7530367` to `origin/loop-bench/144` (merged with `origin/main`, working tree clean).

Changed files:
- `src/conversationList.acceptance.test.ts`: 5 acceptance tests exercising `createHalEngine`, WebSocket wire frames, `InMemorySessionStore`, `MongoSessionStore`, `fiveMemberStore`, and `validateMessage`.
- `specs/hal-engine-websocket-protocol/spec.md`: Sections 4.3 (`list_conversations`), 5.6 (`UNSUPPORTED`), and 5.9 (`conversation_list`) with `validated by` citations to the 5 tests.
- `.lore/dod.md`: quoted central claim, `direct` strategy, acceptance tests, facets, and out-of-scope items.

Test run (`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/conversationList.acceptance.test.ts`):
```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a user conversation list over the WebSocket protocol › delivers only the authenticated user conversations newest first, pages with before, and resumes a listed id
    -   "page1Type": "conversation_list",
    +   "page1Type": "error",
  ● delivering a user conversation list over the WebSocket protocol › answers UNSUPPORTED when history is omitted, when the store omits listFor, or when MongoSessionStore cannot find
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
  ● delivering a user conversation list over the WebSocket protocol › answers SERVER_ERROR with no store detail when listFor rejects, keeps the socket open, and logs the sessionId without user content
    -   "code": "SERVER_ERROR",
    +   "code": "INVALID_MESSAGE",
    -   "loggedSession": true,
    +   "loggedSession": false,
  ● delivering a user conversation list over the WebSocket protocol › answers list_conversations off the per-session lock while a user_message stream is still open
    -   "responseType": "conversation_list",
    +   "responseType": "error",
  ● delivering a user conversation list over the WebSocket protocol › validates list_conversations frames, stripping extra fields and refusing bad limit or before values by field name
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
Time:        0.355 s, estimated 1 s
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}