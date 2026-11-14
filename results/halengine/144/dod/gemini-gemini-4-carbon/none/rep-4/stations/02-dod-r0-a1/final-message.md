Defined the Definition of Done (`direct` strategy) in `.lore/dod.md`, linked the protocol specifications in `specs/hal-engine-websocket-protocol/spec.md`, and wrote four failing acceptance tests in `src/conversationList.acceptance.test.ts`.

### Failure Output (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/conversationList.acceptance.test.ts`)

```text
FAIL src/conversationList.acceptance.test.ts
  ● lists the authenticated user's conversations newest first, pages by cursor, ignores a frame userId, and resumes a listed id

    expect(received).toEqual(expected) // deep equality

    - Expected  - 56
    + Received  +  9

      Object {
    -   "entryCounts": Array [
    -     2,
    -     1,
    -     0,
    -   ],
    -   "isoTimes": true,
    -   "listedIds": Array [
    -     "conv-newer",
    -     "conv-older",
    -     "e94d0988-5c6d-48c6-84e2-520fe0cc9223",
    -   ],
    -   "newestUpdatedAt": "2026-11-14T20:18:23.793Z",
    -   "pagedIds": Array [
    -     "conv-older",
    -   ],
    -   "rejoined": Object {
    -     "replayedCount": 1,
    -     "resumed": true,
    -     "sessionId": "conv-older",
    -   },
    -   "replyType": "conversation_list",
    -   "rowKeys": Array [
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
    -   "storeCalls": Array [
    -     Object {
    -       "before": undefined,
    -       "limit": undefined,
    -       "userId": "u1",
    -     },
    -     Object {
    -       "before": Object {
    -         "sessionId": "conv-newer",
    -         "updatedAt": "2026-11-14T20:18:23.793Z",
    -       },
    -       "limit": 1,
    -       "userId": "u1",
    -     },
    -   ],
    +   "entryCounts": Array [],
    +   "isoTimes": false,
    +   "listedIds": Array [],
    +   "newestUpdatedAt": undefined,
    +   "pagedIds": Array [],
    +   "rejoined": null,
    +   "replyType": "error",
    +   "rowKeys": Array [],
    +   "storeCalls": Array [],
        "trailingTypes": Array [
          "pong",
        ],
      }

      at Object.<anonymous> (src/conversationList.acceptance.test.ts:87:6)

  ● validates list_conversations limits and composite cursors, rejecting malformed fields as INVALID_MESSAGE

    expect(received).toEqual(expected) // deep equality

    - Expected  - 20
    + Received  +  9

      Object {
        "bare": Object {
    -     "data": Object {
    -       "type": "list_conversations",
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
    -     "valid": true,
    -   },
    -   "bareBeforeNamesField": true,
    -   "limitsNameField": true,
    -   "malformedCursorsNameField": true,
    +   "bareBeforeNamesField": false,
    +   "limitsNameField": false,
    +   "malformedCursorsNameField": false,
        "wireRejection": Object {
          "code": "INVALID_MESSAGE",
          "frameTypes": Array [
            "error",
            "pong",
          ],
        },
        "withCursor": Object {
    -     "data": Object {
    -       "before": Object {
    -         "sessionId": "s1",
    -         "updatedAt": "2026-01-15T10:00:00.000Z",
    -       },
    -       "limit": 200,
    -       "type": "list_conversations",
    -     },
    -     "valid": true,
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
        "withExtraField": Object {
    -     "data": Object {
    -       "type": "list_conversations",
    -     },
    -     "valid": true,
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
      }

      at Object.<anonymous> (src/conversationList.acceptance.test.ts:130:6)

  ● answers UNSUPPORTED when history is off or the store cannot list, and SERVER_ERROR without store detail when listing fails

    expect(received).toEqual(expected) // deep equality

    - Expected  - 8
    + Received  + 8

    @@ -3,51 +3,51 @@
          "examplePrompts",
          "message",
          "sessionId",
          "type",
        ],
    -   "exportsStoreCannotList": true,
    -   "unsupportedCode": "UNSUPPORTED",
    -   "warnedWithoutResume": true,
    +   "exportsStoreCannotList": false,
    +   "unsupportedCode": undefined,
    +   "warnedWithoutResume": false,
        "whenHistoryOff": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
            "type": "error",
          },
          Object {
            "code": undefined,
            "type": "pong",
          },
        ],
        "whenListForAbsent": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
            "type": "error",
          },
          Object {
            "code": undefined,
            "type": "pong",
          },
        ],
        "whenListForRejects": Object {
          "frames": Array [
            Object {
    -         "code": "SERVER_ERROR",
    +         "code": "INVALID_MESSAGE",
              "type": "error",
            },
            Object {
              "code": undefined,
              "type": "pong",
            },
          ],
          "leakedStoreDetail": false,
    -     "loggedSessionId": true,
    +     "loggedSessionId": false,
          "loggedUserContent": false,
        },
        "whenStoreThrowsCannotList": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
            "type": "error",
          },

      at Object.<anonymous> (src/conversationList.acceptance.test.ts:167:6)

  ● answers list_conversations while a user_message turn is still streaming on the same session

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "answeredBeforeTurnEnded": "conversation_list",
    -   "listedPriorConversation": true,
    +   "answeredBeforeTurnEnded": "error",
    +   "listedPriorConversation": false,
        "turnCompletedAfterward": true,
      }

      at Object.<anonymous> (src/conversationList.acceptance.test.ts:228:6)

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}