Committed and pushed the red acceptance tests, WebSocket protocol spec updates, and `.lore/dod.md` (`79c162d` on `loop-bench/144`, up to date with `origin/main`).

### Artifacts
- `src/conversationList.acceptance.test.ts` — 5 acceptance tests (`direct` strategy) covering:
  1. Authenticated `conversation_list` delivery (`ws.userId` ownership, newest-first ordering, ISO timestamps, `{limit, before}` pagination, active session inclusion, no `stream_end`, and `?sessionId=` resume).
  2. `UNSUPPORTED` refusals when `transport.history` is off, `store.listFor` is omitted, or `MongoSessionStore` has no `find`, unchanged `ConnectedMessage` without `resume`, and startup warning when `history` is enabled without `resume`.
  3. Safe `SERVER_ERROR` response on `listFor` rejection, open socket continuity, and `sessionId`-tagged logging without leaking store details or user content.
  4. Non-locked execution of `list_conversations` while a `user_message` turn is mid-stream before `stream_end`.
  5. `validateMessage` validation for `list_conversations` (`limit` 1–200, composite `before` cursor `{updatedAt, sessionId}`, dropping extra fields such as `userId`).
- `specs/hal-engine-websocket-protocol/spec.md` — Added Sections 4.3 (`list_conversations`), 5.9 (`conversation_list`), `UNSUPPORTED` in Section 5.6, GDPR note in Section 12, and trailing citations (verified with `check-spec-anchor-names.mjs`, `check-spec-links.mjs`, `check-spec-status.mjs`).
- `.lore/dod.md` — Recorded `direct` strategy, acceptance criteria, facets, and out-of-scope boundaries.

### Observed Red Failure Output
Command: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/conversationList.acceptance.test.ts`

```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a user conversation list over WebSocket › delivers the authenticated user list newest-first with ISO timestamps, pages with before and limit, includes the active session, and resumes a picked id

    expect(received).toEqual(expected) // deep equality
    -   "activeEntryCount": 0,
    -   "firstOptions": Object { "limit": 2 },
    +   "activeEntryCount": undefined,
    +   "firstOptions": undefined,
    +   "isoTimestamps": false,
    +   "page1Ids": Array [],
    +   "page2Ids": Array [],
    +   "recordedUsers": Array [],
    +   "secondOptions": undefined,

  ● delivering a user conversation list over WebSocket › refuses list_conversations with UNSUPPORTED when history is off, when the store omits listFor, or when Mongo has no find, and warns at startup when resume is off

    -   "noFindError": "UNSUPPORTED",
    +   "noFindError": "INVALID_MESSAGE",
    -   "noListError": "UNSUPPORTED",
    +   "noListError": "INVALID_MESSAGE",
    -   "offError": "UNSUPPORTED",
    +   "offError": "INVALID_MESSAGE",
    -   "warned": true,
    +   "warned": false,

  ● delivering a user conversation list over WebSocket › answers a rejecting listFor with SERVER_ERROR without leaking store details, keeps the socket open, and logs the failure with sessionId

    -   "code": "SERVER_ERROR",
    +   "code": "INVALID_MESSAGE",
    -   "loggedSessionId": true,
    +   "loggedSessionId": false,

  ● delivering a user conversation list over WebSocket › answers list_conversations while a user_message turn is streaming without waiting for stream_end

    -   "answeredBeforeStreamEnd": true,
    +   "answeredBeforeStreamEnd": false,

  ● delivering a user conversation list over WebSocket › validates list_conversations frames with optional integer limit 1-200 and composite before cursor, rejecting malformed fields

    -     "valid": true,
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}