Added the red acceptance tests in `src/transport/conversationList.acceptance.test.ts`, linked the protocol specification statements in `specs/hal-engine-websocket-protocol/spec.md`, and recorded the `direct` triage strategy in `.lore/dod.md`.

### Failure output

```text
FAIL src/transport/conversationList.acceptance.test.ts
  ● conversation_list over WebSocket › delivers the authenticated user conversation_list newest-first, supports limit and before paging, and answers an empty array when the user has none

    expect(received).toEqual(expected) // deep equality

    - Expected  - 19
    + Received  +  9

      Object {
        "firstPage": Array [
          Object {
    -       "conversations": Array [
    -         Object {
    -           "createdAt": StringMatching /^\d{4}-\d{2}-\d{2}T/,
    -           "entryCount": 2,
    -           "sessionId": "c2",
    -           "updatedAt": "2026-09-30T09:00:01.000Z",
    -         },
    -         Object {
    -           "createdAt": StringMatching /^\d{4}-\d{2}-\d{2}T/,
    -           "entryCount": 1,
    -           "sessionId": "c1",
    -           "updatedAt": "2026-09-30T08:00:00.000Z",
    +       "code": "INVALID_MESSAGE",
    +       "message": "Unknown message type: conversation_list",
    +       "type": "error",
          },
        ],
    -       "type": "conversation_list",
    -     },
    -   ],
        "nonePage": Array [
          Object {
    -       "conversations": Array [],
    -       "type": "conversation_list",
    +       "code": "INVALID_MESSAGE",
    +       "message": "Unknown message type: conversation_list",
    +       "type": "error",
          },
        ],
        "zeroPage": Array [
          Object {
    -       "conversations": Array [],
    -       "type": "conversation_list",
    +       "code": "INVALID_MESSAGE",
    +       "message": "Unknown message type: conversation_list",
    +       "type": "error",
          },
        ],
      }

  ● conversation_list over WebSocket › answers conversation_list immediately while a turn is streaming on the same session without waiting for the per-session lock

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      Array [
    -   "conversation_list",
    +   "error",
      ]

  ● conversation_list over WebSocket › answers UNSUPPORTED with no stream_end when the session store lacks listFor, SERVER_ERROR when listFor throws, and INVALID_MESSAGE when limit or before is malformed while accepting valid requests

    expect(received).toEqual(expected) // deep equality

    - Expected  - 7
    + Received  + 8

    @@ -1,16 +1,17 @@
      Object {
        "acceptedAfterInvalid": Array [
          Object {
    -       "conversations": Array [],
    -       "type": "conversation_list",
    +       "code": "INVALID_MESSAGE",
    +       "message": "Unknown message type: conversation_list",
    +       "type": "error",
          },
        ],
...
        "throwingFrames": Array [
          Object {
    -       "code": "SERVER_ERROR",
    +       "code": "INVALID_MESSAGE",
            "message": Any<String>,
            "type": "error",
          },
        ],
        "unsupportedFrames": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
            "message": Any<String>,
            "type": "error",
          },
        ],
      }

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}