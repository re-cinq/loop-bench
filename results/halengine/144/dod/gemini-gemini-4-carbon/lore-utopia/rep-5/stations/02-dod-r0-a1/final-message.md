Defined Done for **#144 (Deliver a user's conversation list over the WebSocket protocol)** using strategy **`direct`** in `src/conversationList.acceptance.test.ts`, recorded the triage in `.lore/dod.md`, and linked the new statements in `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`.

### Red-bar test execution (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/conversationList.acceptance.test.ts`)

```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a user conversation list over WebSocket › lists the user conversations newest first, pages with before, and resumes a chosen id

    expect(received).toEqual(expected) // deep equality

    - Expected  - 36
    + Received  +  7

        "fullFrameTypes": Array [
    -     "conversation_list",
    +     "error",
          "pong",
        ],
    -   "listed": Array [ ... ],
    -   "paged": Array [ ... ],
    +   "listed": undefined,
    +   "paged": Array [],
        "rejoinedHead": Object {
    -     "entryCount": 2,
    -     "resumed": true,
    -     "sessionId": "s2",
    +     "entryCount": undefined,
    +     "resumed": false,
    +     "sessionId": "723b1323-7dab-4577-907b-97147e629c35",
        },

  ● delivering a user conversation list over WebSocket › reads the user id from the socket, forwards the cursor, and answers while a turn streams

    expect(received).toEqual(expected) // deep equality

        "frameTypes": Array [
          "entry_upsert",
          "entry_upsert",
          "entry_delta",
    -     "conversation_list",
    +     "error",
          "entry_commit",
          "stream_end",
        ],
    +   "listedIds": Array [],
    +   "recorded": Array [],

  ● delivering a user conversation list over WebSocket › validates list_conversations statically, checking integer limits and two-part cursors

    expect(received).toEqual(expected) // deep equality

    -   "badBeforeString": StringMatching /before/i,
    +   "badBeforeString": "Unknown message type: list_conversations",
        "minimal": Object {
    -     "data": Object {
    -       "type": "list_conversations",
    -     },
    -     "valid": true,
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },

  ● delivering a user conversation list over WebSocket › answers UNSUPPORTED when history is off or the store cannot list, and warns without resume

    expect(received).toEqual(expected) // deep equality

    -         "code": "UNSUPPORTED",
    +         "code": "INVALID_MESSAGE",
              "type": "error",
    ...
    -     "warned": true,
    +     "warned": false,

  ● delivering a user conversation list over WebSocket › answers a rejecting listFor with SERVER_ERROR, hides store detail, and keeps the socket open

    expect(received).toEqual(expected) // deep equality

    -       "code": "SERVER_ERROR",
    +       "code": "INVALID_MESSAGE",
            "timestamp": undefined,
            "type": "error",
    ...
    -   "loggedSessionId": true,
    +   "loggedSessionId": false,

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
Snapshots:   0 total
Time:        0.457 s, estimated 1 s
Ran all test suites matching src/conversationList.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}