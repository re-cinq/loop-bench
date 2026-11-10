Acceptance tests for `#144` are defined in `src/transport/conversationList.acceptance.test.ts`, linked from `specs/hal-engine-conversation-list/spec.md`, and recorded in `.lore/dod.md` under strategy `direct`.

### Failure Output (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`)

```text
FAIL src/transport/conversationList.acceptance.test.ts
  ● delivering a conversation list over the WebSocket protocol › pages the connecting user conversations newest first with ISO dates and forwards limit and before

    expect(received).toEqual(expected) // deep equality

    - Expected  - 38
    + Received  +  5

      Object {
    -   "firstType": "conversation_list",
    -   "forwarded": Array [
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
    -           "sessionId": "s-2",
    -           "updatedAt": "2026-03-01T10:10:00.000Z",
    -         },
    -         "limit": 1,
    -       },
    -       "userId": "u1",
    -     },
    -   ],
    -   "ids": Array [
    -     "s-2",
    -     "s-1",
    -   ],
    -   "s2": Object {
    -     "createdAtIso": true,
    -     "entryCount": 1,
    -     "keys": Array [
    -       "createdAt",
    -       "entryCount",
    -       "sessionId",
    -       "updatedAt",
    -     ],
    -     "updatedAt": "2026-03-01T10:10:00.000Z",
    -   },
    -   "secondIds": Array [
    -     "s-1",
    -   ],
    +   "firstType": "error",
    +   "forwarded": Array [],
    +   "ids": Array [],
    +   "s2": undefined,
    +   "secondIds": Array [],
      }

  ● delivering a conversation list over the WebSocket protocol › answers list_conversations at once without waiting for an in-flight user_message stream

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      Object {
    -   "answeredWhileStreaming": true,
    +   "answeredWhileStreaming": false,
        "endedCleanly": "stream_end",
      }

  ● delivering a conversation list over the WebSocket protocol › accepts valid limit and before bounds and rejects malformed ones with INVALID_MESSAGE without calling listFor

    expect(received).toEqual(expected) // deep equality

    - Expected  - 21
    + Received  +  3

      Object {
    -   "calls": Array [ ... ],
    +   "calls": Array [],
        "invalidOutcomes": Array [ ... ],
        "valid": Array [
    -     "conversation_list",
    -     "conversation_list",
    +     "error",
    +     "error",
        ],
      }

  ● delivering a conversation list over the WebSocket protocol › answers with error UNSUPPORTED when history is absent or the store implements no listFor, and SERVER_ERROR when listFor rejects

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 4

      Object {
        "historyOff": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "type": "error",
        },
        "leakedUserInLog": false,
    -   "loggedError": true,
    +   "loggedError": false,
        "throwing": Object {
    -     "code": "SERVER_ERROR",
    +     "code": "INVALID_MESSAGE",
          "type": "error",
        },
        "unsupported": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "type": "error",
        },
      }

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}