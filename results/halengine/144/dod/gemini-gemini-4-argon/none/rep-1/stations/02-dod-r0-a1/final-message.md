The red acceptance tests in `src/transport/conversationList.acceptance.test.ts`, the Definition of Done in `.lore/dod.md`, and the spec traceability links in `specs/hal-engine-websocket-protocol/spec.md` are committed and pushed.

### Failure Output

```text
FAIL src/transport/conversationList.acceptance.test.ts
  ● delivering a conversation list over the WebSocket protocol › with history enabled, answers list_conversations with the connected user summaries newest first, pages with limit and before, and resumes a chosen id

    expect(received).toEqual(expected) // deep equality

    - Expected  - 21
    + Received  +  6

      Object {
    -   "calledForUsers": Array [
    -     "u1",
    -     "u1",
    -   ],
    -   "isoDates": true,
    -   "listedIds": Array [
    -     "s2",
    -     "s1",
    -     "b9ddf7a1-66a1-4d0d-bfbf-007b8f4c0d3d",
    -   ],
    -   "pagedIds": Array [
    -     "s1",
    -   ],
    +   "calledForUsers": Array [],
    +   "isoDates": undefined,
    +   "listedIds": undefined,
    +   "pagedIds": undefined,
        "resumed": Object {
          "entryCount": 2,
          "resumed": true,
          "upserts": 2,
        },
    -   "secondCallOptions": Object {
    -     "before": Object {
    -       "sessionId": "s2",
    -       "updatedAt": "2099-09-30T09:00:05.000Z",
    -     },
    -     "limit": 1,
    -   },
    +   "secondCallOptions": undefined,
        "types": Array [
          "connected",
    -     "conversation_list",
    +     "error",
          "pong",
        ],
      }

  ● delivering a conversation list over the WebSocket protocol › answers list_conversations off the per-session lock while a user_message is streaming on the same session

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      Object {
    -   "BeforeStreamEnd": true,
    +   "BeforeStreamEnd": false,
        "listIndex": Any<Number>,
      }

  ● delivering a conversation list over the WebSocket protocol › refuses list_conversations with UNSUPPORTED when history is off or the store cannot list, INVALID_MESSAGE when malformed, and SERVER_ERROR when the store rejects

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

    @@ -8,20 +8,20 @@
          "code": "INVALID_MESSAGE",
          "hasList": false,
          "leakedDetail": false,
        },
        "noStore": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "hasList": false,
          "leakedDetail": false,
        },
        "off": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "hasList": false,
          "leakedDetail": false,
        },
        "rejected": Object {
    -     "code": "SERVER_ERROR",
    +     "code": "INVALID_MESSAGE",
          "hasList": false,
          "leakedDetail": false,
        },
      }

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}