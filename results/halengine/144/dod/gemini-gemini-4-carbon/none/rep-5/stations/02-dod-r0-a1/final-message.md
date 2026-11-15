Defined the Definition of Done (`.lore/dod.md`), WebSocket protocol spec traceability links (`specs/hal-engine-websocket-protocol/spec.md`), and red acceptance tests (`src/conversationList.acceptance.test.ts`) for #144 using strategy `direct`.

Actual failure output from `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/conversationList.acceptance.test.ts`:

```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a user conversation list over WebSocket › lists the authenticated user conversations, pages by cursor, and resumes a chosen id

    expect(received).toEqual(expected) // deep equality

    - Expected  - 53
    + Received  + 10

        "firstFrameTypes": Array [
    -     "conversation_list",
    +     "error",
          "pong",
        ],
    -   "pageOneIds": Array [
    -     "984db4a6-668a-4259-afe2-2b8f178ab1df",
    -     "40143a64-20d3-472a-af4d-73377d7b2b9f",
    -     "d446fb65-bedc-44af-a50c-3d673bc83025",
    -   ],
    +   "pageOneIds": Array [],
    +   "recorded": Array [],
        "resumedConnected": Object {
    -     "entryCount": 2,
    -     "resumed": true,
    -     "sessionId": "d446fb65-bedc-44af-a50c-3d673bc83025",
    +     "entryCount": undefined,
    +     "resumed": false,
    +     "sessionId": "d4ea777f-edb4-4ef0-b6c8-918bd936cde2",
        },

  ● delivering a user conversation list over WebSocket › answers list_conversations while a turn streams without waiting on the session lock

    expect(received).toEqual(expected) // deep equality

        "beforeRelease": Array [
          "connected",
          "entry_upsert",
          "entry_upsert",
          "entry_delta",
    -     "conversation_list",
    +     "error",
        ],
    -   "listedCountWhileStreaming": 1,
    +   "listedCountWhileStreaming": -1,

  ● delivering a user conversation list over WebSocket › validates list_conversations limits and composite cursors, naming the bad field

    expect(received).toEqual(expected) // deep equality

        "bare": Object {
    -     "data": Object {
    -       "type": "list_conversations",
    -     },
    -     "valid": true,
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },

  ● delivering a user conversation list over WebSocket › answers UNSUPPORTED when history is off, listFor is absent, or a collection lacks find

    expect(received).toEqual(expected) // deep equality

    -   "exportedErrorClass": "function",
    +   "exportedErrorClass": "undefined",
        "historyOff": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "types": Array [
            "error",
            "pong",
          ],
        },
    -   "unsupportedCode": "UNSUPPORTED",
    +   "unsupportedCode": undefined,
        "warnOnlyTypes": Array [
    -     "conversation_list",
    +     "error",
          "pong",
        ],
    -   "warnedWithoutResume": true,
    +   "warnedWithoutResume": false,

  ● delivering a user conversation list over WebSocket › answers a failing store with a generic SERVER_ERROR, stays open, and logs safely

    expect(received).toEqual(expected) // deep equality

    -   "code": "SERVER_ERROR",
    +   "code": "INVALID_MESSAGE",
        "leakedHost": false,
        "leakedUserContent": false,
    -   "loggedSessionId": true,
    +   "loggedSessionId": false,
        "pongEcho": 9,
        "socketStillOpen": true,

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}