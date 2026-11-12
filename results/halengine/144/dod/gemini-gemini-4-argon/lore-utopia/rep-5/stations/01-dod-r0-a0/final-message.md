Red acceptance tests for `#144` are committed and pushed in `src/transport/conversationList.acceptance.test.ts` alongside `.lore/dod.md` and spec citations in `specs/hal-engine-conversation-list/spec.md`.

### Failure Output

```text
FAIL src/transport/conversationList.acceptance.test.ts
  ● delivering a conversation list over the websocket › lists the connecting user's conversations newest first as ISO summaries, forwards the cursor, and resumes a chosen row

    expect(received).toEqual(expected) // deep equality

    - Expected  - 36
    + Received  +  6

      Object {
    -   "calls": Array [
    -     Object {
    -       "options": Object {
    -         "before": undefined,
    -         "limit": undefined,
    -       },
    -       "userId": "u1",
    -     },
    -     Object {
    -       "options": Object {
    -         "before": Object {
    -           "sessionId": "s3",
    -           "updatedAt": "2026-09-30T10:00:00.000Z",
    -         },
    -         "limit": 2,
    -       },
    -       "userId": "u1",
    -     },
    -   ],
    -   "ids": Array [
    -     "s3",
    -     "s2",
    -     "s1",
    -     "088f8b12-6585-45e2-9f4b-19c78c49a9ae",
    -   ],
    +   "calls": Array [],
    +   "ids": Array [],
        "isoTimes": true,
    -   "pagedIds": Array [
    -     "s2",
    -     "s1",
    -   ],
    +   "pagedIds": Array [],
        "resumed": Object {
    -     "replayed": Object {
    -       "content": "msg-s2",
    -       "role": "user",
    -       "timestamp": "2026-09-30T09:00:00.000Z",
    -     },
    -     "resumed": true,
    +     "replayed": undefined,
    +     "resumed": false,
        },
    -   "type": "conversation_list",
    +   "type": "error",
      }

  ● delivering a conversation list over the websocket › refuses a list with UNSUPPORTED when history is off or the store lacks listFor, INVALID_MESSAGE on bad bounds, and SERVER_ERROR when the store rejects

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 4

      Object {
        "badLimit": Object {
          "code": "INVALID_MESSAGE",
    -     "namesField": true,
    +     "namesField": false,
          "type": "error",
        },
        "whenOff": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "type": "error",
        },
        "whenRejected": Object {
    -     "code": "SERVER_ERROR",
    +     "code": "INVALID_MESSAGE",
          "leaked": false,
          "type": "error",
        },
        "whenUnimplemented": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "type": "error",
        },
      }

  ● delivering a conversation list over the websocket › answers list_conversations while a user_message is streaming, without waiting on the session lock

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      Object {
        "beforeStreamEnd": true,
    -   "listed": true,
    +   "listed": false,
      }

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}