The branch `loop-bench/144` already contains commit `1771147` (`test(ws): define acceptance criteria for conversation list (#144)`) on top of `origin/main` (`2926558`), with `.lore/dod.md`, `specs/hal-engine-websocket-protocol/spec.md`, and `src/conversationList.acceptance.test.ts` committed and up to date with `origin/loop-bench/144` (`git fetch origin main` showed no newer commits on `origin/main`). `prettier --check`, `check-spec-links.mjs`, `check-spec-anchor-names.mjs` (`46 citation(s)`), and `check-spec-status.mjs` all pass.

Each of the five acceptance tests in `src/conversationList.acceptance.test.ts` was run via `node scripts/lore-run-test.mjs` and fails on the missing `list_conversations` / `transport.history` behaviour:

1. `delivers the connecting user's conversations newest first with ISO dates, ignores a forged userId, pages with before, and lets the client resume a listed id`:
```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a user conversation list over WebSocket › delivers the connecting user's conversations newest first with ISO dates, ignores a forged userId, pages with before, and lets the client resume a listed id

    expect(received).toEqual(expected) // deep equality

    -   "allTypes": Array [
    -     "conversation_list",
    +   "allTypes": Array [
    +     "error",
          "pong",
        ],
```

2. `rejects malformed list_conversations frames in validation and on the wire without stream_end`:
```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a user conversation list over WebSocket › rejects malformed list_conversations frames in validation and on the wire without stream_end

        "accepted": Object {
    -     "data": Object {
    -       "type": "list_conversations",
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
    -   "cursorsRefused": true,
    -   "limitsRefused": true,
    +   "cursorsRefused": false,
    +   "limitsRefused": false,
```

3. `answers list_conversations while a user_message turn is mid-stream, without waiting for stream_end`:
```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a user conversation list over WebSocket › answers list_conversations while a user_message turn is mid-stream, without waiting for stream_end

      Object {
    -   "answeredMidStream": true,
    +   "answeredMidStream": false,
        "streamEndedAfter": true,
      }
```

4. `refuses list_conversations with UNSUPPORTED when history is off or the store cannot list, and warns when history is enabled without resume`:
```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a user conversation list over WebSocket › refuses list_conversations with UNSUPPORTED when history is off or the store cannot list, and warns when history is enabled without resume

    -   "fiveMemberCode": "UNSUPPORTED",
    -   "mongoCode": "UNSUPPORTED",
    +   "fiveMemberCode": "INVALID_MESSAGE",
    +   "mongoCode": "INVALID_MESSAGE",
        "plainWire": Array [
    -     "error:UNSUPPORTED",
    +     "error:INVALID_MESSAGE",
          "pong:",
        ],
    -   "warnedWithoutResume": true,
    +   "warnedWithoutResume": false,
```

5. `answers SERVER_ERROR without leaking store details when listFor fails, logs with sessionId, and keeps the socket open`:
```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a user conversation list over WebSocket › answers SERVER_ERROR without leaking store details when listFor fails, logs with sessionId, and keeps the socket open

      Object {
    -   "code": "SERVER_ERROR",
    +   "code": "INVALID_MESSAGE",
        "leaked": false,
    -   "loggedSessionId": true,
    +   "loggedSessionId": false,
        "pongTimestamp": 42,
      }
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}