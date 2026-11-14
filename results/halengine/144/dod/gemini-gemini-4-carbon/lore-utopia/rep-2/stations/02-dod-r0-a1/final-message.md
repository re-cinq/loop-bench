Defined DONE for `re-cinq/HALEngine#144` using strategy `direct` in `.lore/dod.md`, linked all five acceptance tests in `specs/hal-engine-websocket-protocol/spec.md`, and verified all five fail against the live WebSocket transport and validator seams in `src/conversationList.acceptance.test.ts`:

```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a user conversation list over WebSocket › delivers the connecting user's conversations newest first, pages by cursor, and resumes a chosen id

    expect(received).toEqual(expected) // deep equality

    - Expected  - 30
    + Received  +  6

      Object {
    -   "allIsoStrings": true,
    +   "allIsoStrings": false,
        "connectedKeys": Array [
          "examplePrompts",
          "message",
          "resumed",
          "sessionId",
          "type",
        ],
    -   "entryCounts": Array [
    -     1,
    -     1,
    -     0,
    -   ],
    +   "entryCounts": Array [],
        "firstFrameTypes": Array [
    -     "conversation_list",
    +     "error",
        ],
    -   "listedIds": Array [
    -     "newer",
    -     "older",
    -     "7eb8a85f-fab8-4f56-bf45-0619a1744055",
    -   ],
    -   "recordedCalls": Array [
    -     Object {
    -       "before": undefined,
    -       "limit": undefined,
    -       "userId": "u1",
    -     },
    -     Object {
    -       "before": Object {
    -         "sessionId": "newer",
    -         "updatedAt": "2099-01-01T09:00:00.000Z",
    -       },
    -       "limit": 1,
    -       "userId": "u1",
    -     },
    -   ],
    +   "listedIds": Array [],
    +   "recordedCalls": Array [],
        "resumed": Object {
          "entryCount": 1,
          "flag": true,
          "replayed": Array [
            "older",
          ],
          "sessionId": "older",
        },
    -   "secondPageIds": Array [
    -     "older",
    -   ],
    +   "secondPageIds": Array [],
      }

  ● delivering a user conversation list over WebSocket › answers list_conversations while a user_message is still streaming on the same session

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 2

    @@ -2,13 +2,11 @@
        "frameTypes": Array [
          "connected",
          "entry_upsert",
          "entry_upsert",
          "entry_delta",
    -     "conversation_list",
    +     "error",
          "entry_commit",
          "stream_end",
        ],
    -   "listedIds": Array [
    -     "b0791281-1a8e-4a39-a235-4d8e93260d60",
    -   ],
    +   "listedIds": Array [],
      }

  ● delivering a user conversation list over WebSocket › refuses with UNSUPPORTED when history is off or the store cannot list, and warns when resume is off

    expect(received).toEqual(expected) // deep equality

    - Expected  - 5
    + Received  + 5

    @@ -1,9 +1,9 @@
      Object {
        "bareStoreReply": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
            "type": "error",
          },
        ],
        "connectedKeysBaseline": Array [
          "examplePrompts",
    @@ -11,25 +11,25 @@
          "sessionId",
          "type",
        ],
        "findlessCollectionReply": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
            "type": "error",
          },
        ],
        "omittedReply": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
            "type": "error",
          },
        ],
        "switchedOffReply": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
            "type": "error",
          },
        ],
        "warnedWhenHistoryFalse": false,
    -   "warnedWithResumeOff": true,
    +   "warnedWithResumeOff": false,
        "warnedWithResumeOn": false,
      }

  ● delivering a user conversation list over WebSocket › answers a rejecting listFor with SERVER_ERROR without leaking store or user detail, and keeps the socket open

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 2

      Object {
        "frames": Array [
          Object {
    -       "code": "SERVER_ERROR",
    +       "code": "INVALID_MESSAGE",
            "type": "error",
          },
        ],
        "leakedStoreDetail": false,
        "leakedUserContent": false,
    -   "loggedSessionIds": Array [
    -     "c663b9ff-2c35-40ac-b3d7-fdd1c983233a",
    -   ],
    +   "loggedSessionIds": Array [],
        "pongTimestamp": 7,
      }

  ● delivering a user conversation list over WebSocket › validates list_conversations limits and composite cursors independently of whether history is enabled

    expect(received).toEqual(expected) // deep equality

    - Expected  - 31
    + Received  + 17

      Object {
        "bare": Object {
    -     "data": Object {
    -       "type": "list_conversations",
    -     },
    -     "valid": true,
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
        ...
      }

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}