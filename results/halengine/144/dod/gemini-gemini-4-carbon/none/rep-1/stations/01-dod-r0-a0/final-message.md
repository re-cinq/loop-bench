Defined Done for `#144` (`direct` strategy) in `.lore/dod.md`, added four failing acceptance tests in `src/conversationList.acceptance.test.ts` linked from `specs/hal-engine-websocket-protocol/spec.md`, and pushed commit `8e248f0` to `origin/loop-bench/144`.

Actual failure output from `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/conversationList.acceptance.test.ts`:

```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a user conversation list over the WebSocket protocol › lists the user conversations newest first, pages by cursor, and resumes a listed id

    expect(received).toEqual(expected) // deep equality

    - Expected  - 50
    + Received  + 11

    @@ -4,63 +4,24 @@
          "message",
          "resumed",
          "sessionId",
          "type",
        ],
    -   "firstPageIds": Array [
    -     "s-newest",
    -   ],
    +   "firstPageIds": Array [],
        "fullFrameTypes": Array [
    -     "conversation_list",
    +     "error",
        ],
        "isoTimestamps": true,
    -   "listedRows": Array [
    -     Object {
    -       "entryCount": 1,
    -       "sessionId": "s-newest",
    -     },
    -     Object {
    -       "entryCount": 1,
    -       "sessionId": "s-middle",
    -     },
    -     Object {
    -       "entryCount": 0,
    -       "sessionId": "1a04a037-d41c-450a-a7fa-66550df8606b",
    -     },
    -   ],
    +   "listedRows": Array [],
        "rejoinedHead": Object {
    -     "entryCount": 1,
    -     "resumed": true,
    -     "sessionId": "s-newest",
    +     "entryCount": undefined,
    +     "resumed": false,
    +     "sessionId": "c9b59061-fdd9-4e5c-8487-b89f410101d9",
        },
    -   "replayedContent": Array [
    -     "first chat",
    -   ],
    -   "secondPageIds": Array [
    -     "s-middle",
    -     "1a04a037-d41c-450a-a7fa-66550df8606b",
    -   ],
    -   "summaryKeys": Array [
    -     Array [
    -       "createdAt",
    -       "entryCount",
    -       "sessionId",
    -       "updatedAt",
    -     ],
    -     Array [
    -       "createdAt",
    -       "entryCount",
    -       "sessionId",
    -       "updatedAt",
    -     ],
    -     Array [
    -       "createdAt",
    -       "entryCount",
    -       "sessionId",
    -       "updatedAt",
    -     ],
    -   ],
    +   "replayedContent": Array [],
    +   "secondPageIds": Array [],
    +   "summaryKeys": Array [],
        "topUpdatedAt": Array [
    -     "2099-06-02T12:00:00.000Z",
    -     "2099-06-01T12:00:00.000Z",
    +     undefined,
    +     undefined,
        ],
      }

  ● delivering a user conversation list over the WebSocket protocol › answers from the connection user id while a turn is streaming, before stream_end

    expect(received).toEqual(expected) // deep equality

    - Expected  - 12
    + Received  +  3

      Object {
        "answeredBeforeStreamEnd": true,
    -   "listedIds": Array [
    -     "s-own",
    -     "600320be-dbc6-4a6c-8f37-191a48a361c9",
    -   ],
    -   "recordedCalls": Array [
    -     Object {
    -       "before": undefined,
    -       "limit": undefined,
    -       "userId": "u1",
    -     },
    -   ],
    -   "replyType": "conversation_list",
    +   "listedIds": Array [],
    +   "recordedCalls": Array [],
    +   "replyType": "error",
      }

  ● delivering a user conversation list over the WebSocket protocol › validates list_conversations and refuses malformed limit or before cursors

    expect(received).toEqual(expected) // deep equality

    - Expected  - 22
    + Received  + 13

      Object {
        "bare": Object {
    -     "data": Object {
    -       "type": "list_conversations",
    -     },
    -     "valid": true,
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
        "paged": Object {
    -     "data": Object {
    -       "before": Object {
    -         "sessionId": "s1",
    -         "updatedAt": "2099-06-01T12:00:00.000Z",
    -       },
    -       "limit": 200,
    -       "type": "list_conversations",
    -     },
    -     "valid": true,
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
        "rejectedCursors": Array [
    -     "invalid:before",
    -     "invalid:before",
    -     "invalid:before",
    -     "invalid:before",
    -     "invalid:before",
    +     "Unknown message type: list_conversations",
    +     "Unknown message type: list_conversations",
    +     "Unknown message type: list_conversations",
    +     "Unknown message type: list_conversations",
    +     "Unknown message type: list_conversations",
        ],
        "rejectedLimits": Array [
    -     "invalid:limit",
    -     "invalid:limit",
    -     "invalid:limit",
    -     "invalid:limit",
    +     "Unknown message type: list_conversations",
    +     "Unknown message type: list_conversations",
    +     "Unknown message type: list_conversations",
    +     "Unknown message type: list_conversations",
        ],
      }

  ● delivering a user conversation list over the WebSocket protocol › answers UNSUPPORTED when unavailable and SERVER_ERROR without store detail on failure

    expect(received).toEqual(expected) // deep equality

    - Expected  - 6
    + Received  + 6

      Object {
        "collectionWithoutFind": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
            "type": "error",
          },
        ],
        "defaultOff": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
            "type": "error",
          },
        ],
        "fiveMember": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
            "type": "error",
          },
        ],
        "leakedStoreHost": false,
        "leakedUserContent": false,
    -   "loggedSessionId": true,
    +   "loggedSessionId": false,
        "rejectedList": Array [
          Object {
    -       "code": "SERVER_ERROR",
    +       "code": "INVALID_MESSAGE",
            "type": "error",
          },
        ],
    -   "warnedWithoutResume": true,
    +   "warnedWithoutResume": false,
      }

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
Snapshots:   0 total
Time:        0.477 s, estimated 1 s
Ran all test suites within paths "src/conversationList.acceptance.test.ts".
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}