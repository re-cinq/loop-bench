Added executable acceptance tests in `src/transport/conversationList.acceptance.test.ts`, linked them in `specs/hal-engine-websocket-protocol/spec.md`, and recorded the `direct` triage in `.lore/dod.md`.

### Failure Output (`NODE_OPTIONS=--experimental-vm-modules npx jest src/transport/conversationList.acceptance.test.ts`)

```text
FAIL src/transport/conversationList.acceptance.test.ts
  ● delivering a user conversation list over the websocket protocol › validates list_conversations with an optional 1..200 integer limit and a composite before cursor, and rejects malformed fields by name

    expect(received).toEqual(expected) // deep equality

    - Expected  - 15
    + Received  +  6

      Object {
    -   "beforesRejected": true,
    -   "limitsRejected": true,
    +   "beforesRejected": false,
    +   "limitsRejected": false,
        "validBare": Object {
    -     "data": Object {
    -       "type": "list_conversations",
    -     },
    -     "valid": true,
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
        "validPaged": Object {
    -     "data": Object {
    -       "before": Object {
    -         "sessionId": "c2",
    -         "updatedAt": "2026-09-30T08:00:00.000Z",
    -       },
    -       "limit": 25,
    -       "type": "list_conversations",
    -     },
    -     "valid": true,
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
      }

  ● delivering a user conversation list over the websocket protocol › answers list_conversations with the connected user conversations newest first as ISO summaries, forwards limit and before to listFor with ws.userId, and resumes a listed id

    expect(received).toEqual(expected) // deep equality

    - Expected  - 40
    + Received  +  9

      Object {
    -   "calls": Array [
    -     Object {
    -       "options": Object {
    -         "before": undefined,
    -         "limit": 2,
    -       },
    -       "userId": "u1",
    -     },
    -     Object {
    -       "options": Object {
    -         "before": Object {
    -           "sessionId": "c2",
    -           "updatedAt": "2099-09-30T09:00:00.000Z",
    -         },
    -         "limit": 2,
    -       },
    -       "userId": "u1",
    -     },
    -   ],
    -   "firstEntryCounts": Array [
    -     1,
    -     1,
    -   ],
    -   "firstIds": Array [
    -     "c3",
    -     "c2",
    -   ],
    +   "calls": Array [],
    +   "firstEntryCounts": undefined,
    +   "firstIds": undefined,
        "firstTypes": Array [
    -     "conversation_list",
    +     "error",
        ],
    -   "isoDates": true,
    -   "replayedContent": Object {
    -     "content": "msg c3",
    -     "role": "user",
    -     "timestamp": "2099-09-30T10:00:00.000Z",
    -   },
    +   "isoDates": undefined,
    +   "replayedContent": undefined,
        "resumedHeader": Object {
    -     "resumed": true,
    -     "sessionId": "c3",
    +     "resumed": false,
    +     "sessionId": "09b50225-02c7-481d-b5ec-af9baf87a6bb",
        },
    -   "secondIds": Array [
    -     "c1",
    -     "38a7ad3c-8f41-46b8-9502-84aed81b660a",
    -   ],
    +   "secondIds": undefined,
      }

  ● delivering a user conversation list over the websocket protocol › answers list_conversations while a user_message is streaming without waiting on the session lock

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
        "endedBeforeRelease": false,
    -   "listedFirst": "earlier",
    +   "listedFirst": undefined,
        "midStreamTypes": Array [
    -     "conversation_list",
    +     "error",
        ],
      }

  ● delivering a user conversation list over the websocket protocol › answers UNSUPPORTED when history is off, store.listFor is absent, or the store throws StoreCannotList, and answers SERVER_ERROR without store detail when listFor rejects

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 4

      Object {
        "cannotList": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
            "message": Any<String>,
            "type": "error",
          },
        ],
        "historyOff": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
            "message": Any<String>,
            "type": "error",
          },
        ],
        "leakedStoreDetail": false,
        "noListFor": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
            "message": Any<String>,
            "type": "error",
          },
        ],
        "rejectingFrames": Array [
          Object {
    -       "code": "SERVER_ERROR",
    +       "code": "INVALID_MESSAGE",
            "message": Any<String>,
            "type": "error",
          },
        ],
      }

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}