Defined the Definition of Done (`direct` strategy) in `.lore/dod.md`, added protocol spec statements, GDPR security considerations, and exact `[validated by: ...]` citations in `specs/hal-engine-websocket-protocol/spec.md`, and committed four failing acceptance tests in `src/conversationList.acceptance.test.ts` (`7ef115c`, pushed to `origin/loop-bench/144`).

Failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js --no-color src/conversationList.acceptance.test.ts`:

```text
FAIL src/conversationList.acceptance.test.ts
  ● conversation list over WebSocket › lists only the authenticated user conversations, pages by cursor, and resumes a chosen id

    expect(received).toEqual(expected) // deep equality

    - Expected  - 50
    + Received  +  7

    @@ -5,46 +5,22 @@
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
        "firstTypes": Array [
    -     "conversation_list",
    +     "error",
          "pong",
        ],
    -   "listedIds": Array [
    -     "newer",
    -     "older",
    -     "9af39731-2a23-44b7-9283-dbe9a6247e74",
    -   ],
    -   "pagedIds": Array [
    -     "older",
    -   ],
    +   "listedIds": Array [],
    +   "pagedIds": Array [],
        "pagedTypes": Array [
    -     "conversation_list",
    +     "error",
          "pong",
        ],
    -   "recorded": Array [
    -     Object {
    -       "before": undefined,
    -       "limit": undefined,
    -       "userId": "u1",
    -     },
    -     Object {
    -       "before": Object {
    -         "sessionId": "newer",
    -         "updatedAt": "2026-11-14T09:57:41.939Z",
    -       },
    -       "limit": 1,
    -       "userId": "u1",
    -     },
    -   ],
    +   "recorded": Array [],
        "replayed": Array [
          Object {
            "entry": Object {
              "content": "first question",
              "role": "user",
    @@ -64,27 +40,8 @@
            "type",
          ],
          "resumed": true,
          "sessionId": "older",
        },
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
    +   "summaryKeys": Array [],
        "warnedWithResume": false,
      }

  ● conversation list over WebSocket › answers list_conversations while a user_message is still running, before stream_end

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 2

      Object {
    -   "listedIds": Array [
    -     "bc1c0e95-65fd-4c96-977b-863c45acaaf0",
    -   ],
    +   "listedIds": undefined,
        "order": Array [
    -     "conversation_list",
    +     "error",
          "stream_end",
        ],
      }

  ● conversation list over WebSocket › validates list_conversations limits and cursors, refusing out-of-range or partial values

    expect(received).toEqual(expected) // deep equality

    - Expected  - 28
    + Received  + 16

      Object {
        "bare": Object {
    -     "data": Object {
    -       "type": "list_conversations",
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
        ...

  ● conversation list over WebSocket › answers UNSUPPORTED when listing is off or unavailable, and SERVER_ERROR without store detail

    expect(received).toEqual(expected) // deep equality

    - Expected  - 8
    + Received  + 8

      Object {
        "detailSentToClient": false,
    -   "failureCode": "SERVER_ERROR",
    +   "failureCode": "INVALID_MESSAGE",
        "failureTypes": Array [
          "error",
          "pong",
        ],
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
        "lackingFind": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "types": Array [
            "error",
            "pong",
          ],
        },
    -   "loggedWithSessionId": true,
    -   "storeCannotListExport": "function",
    -   "unsupportedCode": "UNSUPPORTED",
    +   "loggedWithSessionId": false,
    +   "storeCannotListExport": "undefined",
    +   "unsupportedCode": undefined,
        "userContentLogged": false,
    -   "warnedWithoutResume": true,
    +   "warnedWithoutResume": false,
      }

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}