Defined the Definition of Done (`direct` strategy) in `.lore/dod.md`, linked the new protocol and conversation-list spec statements in `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`, and committed the failing acceptance suite in `src/conversationList.acceptance.test.ts` (`2c7ff4c`, pushed to `origin/loop-bench/144`).

Failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js --no-color src/conversationList.acceptance.test.ts`:

```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a conversation list over the websocket › validates list_conversations bounds and cursor, and drops any extra field

    expect(received).toEqual(expected) // deep equality

    - Expected  - 31
    + Received  + 16

      Object {
        "bare": Object {
    -     "data": Object {
    -       "type": "list_conversations",
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
    -     "valid": true,
    -   },
        "existingFramesCount": 10,
        "lowerBound": Object {
    -     "data": Object {
    -       "limit": 1,
    -       "type": "list_conversations",
    -     },
    -     "valid": true,
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
        "paged": Object {
    -     "data": Object {
    -       "before": Object {
    -         "sessionId": "s2",
    -         "updatedAt": "2026-01-02T00:00:01.000Z",
    -       },
    -       "limit": 20,
    -       "type": "list_conversations",
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
    -     "valid": true,
    -   },
        "rejectedBefores": Array [
    -     true,
    -     true,
    -     true,
    -     true,
    +     false,
    +     false,
    +     false,
    +     false,
        ],
        "rejectedLimits": Array [
    -     true,
    -     true,
    -     true,
    -     true,
    +     false,
    +     false,
    +     false,
    +     false,
        ],
        "upperBound": Object {
    -     "data": Object {
    -       "limit": 200,
    -       "type": "list_conversations",
    -     },
    -     "valid": true,
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
      }

  ● delivering a conversation list over the websocket › lists the connected user conversations newest first, pages, and resumes a picked id

    expect(received).toEqual(expected) // deep equality

    - Expected  - 58
    + Received  +  7

    @@ -5,74 +5,23 @@
          "resumed",
          "sessionId",
          "type",
        ],
        "firstTypes": Array [
    -     "conversation_list",
    +     "error",
          "pong",
        ],
    -   "listedIds": Array [
    -     "ace11c36-ec68-4b84-9f95-dd657a6d8316",
    -     "middle",
    -     "older",
    -   ],
    +   "listedIds": Array [],
        "middleStamps": Object {
    -     "createdAt": "2026-01-02T00:00:00.000Z",
    -     "updatedAt": "2026-01-02T00:00:01.000Z",
    +     "createdAt": undefined,
    +     "updatedAt": undefined,
        },
    -   "pagedIds": Array [
    -     "middle",
    -   ],
    -   "recordedCalls": Array [
    -     Object {
    -       "before": undefined,
    -       "limit": undefined,
    -       "userId": "u1",
    -     },
    -     Object {
    -       "before": Object {
    -         "sessionId": "",
    -         "updatedAt": "",
    -       },
    -       "limit": 1,
    -       "userId": "u1",
    -     },
    -   ],
    +   "pagedIds": Array [],
    +   "recordedCalls": Array [],
        "rejoinedHead": Object {
          "entryCount": 2,
          "replayed": 2,
          "resumed": true,
          "sessionId": "older",
        },
    +   "shapes": Array [],
      }

  ● delivering a conversation list over the websocket › answers list_conversations before stream_end while a turn is still streaming

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 2

      Object {
    -   "listedIds": Array [
    -     "03fbba94-ada9-4d51-af77-d8af5b204e88",
    -   ],
    +   "listedIds": Array [],
        "order": Array [
    -     "conversation_list",
    +     "error",
          "stream_end",
        ],
      }

  ● delivering a conversation list over the websocket › answers UNSUPPORTED when disabled or incapable, and SERVER_ERROR when listFor rejects

    expect(received).toEqual(expected) // deep equality

    - Expected  - 10
    + Received  + 10

      Object {
        "bareMongo": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "types": Array [
            "error",
            "pong",
          ],
        },
    -   "exportedErrorClass": true,
    -   "exportedErrorCode": true,
    +   "exportedErrorClass": false,
    +   "exportedErrorCode": false,
        "failingStore": Object {
    -     "code": "SERVER_ERROR",
    +     "code": "INVALID_MESSAGE",
          "keptEntryTextPrivate": true,
          "keptStoreErrorInternal": true,
    -     "loggedSessionId": true,
    +     "loggedSessionId": false,
          "types": Array [
            "error",
            "pong",
          ],
        },
        "fiveMember": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "types": Array [
            "error",
            "pong",
          ],
        },
        "historyOff": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "types": Array [
            "error",
            "pong",
          ],
        },
        "historyOmitted": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "types": Array [
            "error",
            "pong",
          ],
        },
    -   "mongoThrowsStoreCannotList": true,
    -   "warnedWhenResumeOmitted": true,
    +   "mongoThrowsStoreCannotList": false,
    +   "warnedWhenResumeOmitted": false,
        "warnedWithResume": false,
      }

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}