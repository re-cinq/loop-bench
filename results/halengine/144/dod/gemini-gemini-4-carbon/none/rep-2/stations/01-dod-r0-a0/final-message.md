Defined the Definition of Done for `#144` using strategy `direct` in `.lore/dod.md`, added four end-to-end WebSocket acceptance tests in `src/conversationList.acceptance.test.ts`, and linked them from `specs/hal-engine-websocket-protocol/spec.md` (commit `51e87c1` pushed to `origin/loop-bench/144`).

Failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js src/conversationList.acceptance.test.ts`:

```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a user conversation list over WebSocket › lists the connected user conversations as ISO summaries, pages by cursor, and resumes one

    expect(received).toEqual(expected) // deep equality

    - Expected  - 72
    + Received  +  9

      Object {
    -   "allCreatedAtIso": true,
    +   "allCreatedAtIso": false,
        "connectedKeys": Array [
          "examplePrompts",
          "message",
          "resumed",
          "sessionId",
          "type",
        ],
        "connectedResumed": false,
        "firstExchangeTypes": Array [
    -     "conversation_list",
    +     "error",
          "pong",
        ],
    -   "freshEntryCount": 0,
    -   "listedIds": Array [
    -     "s3",
    -     "s2",
    -     "s1",
    -     "0a04f471-d031-41f6-8404-20b69a16dc5b",
    -   ],
    -   "pagedIds": Array [
    -     "s2",
    -     "s1",
    -   ],
    -   "recordedCalls": Array [
    -     Object {
    -       "before": undefined,
    -       "limit": undefined,
    -       "userId": "u1",
    -     },
    -     Object {
    -       "before": Object {
    -         "sessionId": "s3",
    -         "updatedAt": "2099-01-01T00:00:03.000Z",
    -       },
    -       "limit": 2,
    -       "userId": "u1",
    -     },
    -   ],
    +   "freshEntryCount": undefined,
    +   "listedIds": Array [],
    +   "pagedIds": Array [],
    +   "recordedCalls": Array [],
        "resumed": Object {
          "entryCount": 2,
          "replayed": Array [
            "second question",
            "second answer",
          ],
          "resumed": true,
        },
        ...
        "secondExchangeTypes": Array [
    -     "conversation_list",
    +     "error",
          "pong",
        ],
        ...
      }

  ● delivering a user conversation list over WebSocket › answers list_conversations during a streaming turn and refuses malformed limit or before

    expect(received).toEqual(expected) // deep equality

      Object {
    -   "answeredAfterDelta": true,
    -   "answeredBeforeStreamEnd": true,
    +   "answeredAfterDelta": false,
    +   "answeredBeforeStreamEnd": false,
        ...
    -   "midTurnReplyType": "conversation_list",
    +   "midTurnReplyType": "error",
        "staticValidation": Object {
    -     "data": Object {
    -       "type": "list_conversations",
    -     },
    -     "valid": true,
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
      }

  ● delivering a user conversation list over WebSocket › answers UNSUPPORTED when history is off or the store cannot list conversations

    expect(received).toEqual(expected) // deep equality

      Object {
        "collectionWithoutFind": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "types": Array [
            "error",
            "pong",
          ],
        },
        "defaultOff": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "types": Array [
            "error",
            "pong",
          ],
        },
        "explicitOff": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "types": Array [
            "error",
            "pong",
          ],
        },
        "withoutListMember": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "types": Array [
            "error",
            "pong",
          ],
        },
      }

  ● delivering a user conversation list over WebSocket › answers SERVER_ERROR with no store detail, keeps the socket open, and logs a failed listFor

    expect(received).toEqual(expected) // deep equality

      Object {
    -   "code": "SERVER_ERROR",
    +   "code": "INVALID_MESSAGE",
        "hasMessage": true,
        "leaksStoreDetail": false,
    -   "loggedSessionIds": Array [
    -     "a352fbc1-e8a7-4ed0-9d80-b2d729e6c4c1",
    -   ],
    +   "loggedSessionIds": Array [],
        "logsUserContent": false,
        "types": Array [
          "error",
          "pong",
        ],
      }

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
Snapshots:   0 total
Time:        0.479 s, estimated 1 s
Ran all test suites matching src/conversationList.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}