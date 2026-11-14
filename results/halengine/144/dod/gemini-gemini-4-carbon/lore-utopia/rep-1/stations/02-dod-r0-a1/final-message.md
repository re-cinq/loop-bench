Defined the Definition of Done (`.lore/dod.md`, strategy: `direct`), WebSocket protocol specification additions and citations (`specs/hal-engine-websocket-protocol/spec.md` § 4.3, § 5.6, § 5.9), and executable acceptance suite (`src/conversationList.acceptance.test.ts`) for re-cinq/HALEngine#144, committed (`a1ce3b1`) and pushed to `origin/loop-bench/144`.

### Actual failure output (`src/conversationList.acceptance.test.ts`)

```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a user conversation list over the WebSocket protocol › validates list_conversations bounds and cursor, and drops extra fields

    expect(received).toEqual(expected) // deep equality

    - Expected  - 26
    + Received  + 11

      Object {
        "bare": Object {
    -     "payload": Object {
    -       "type": "list_conversations",
    -     },
    -     "valid": true,
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
    -   "cursorsRejected": true,
    +   "cursorsRejected": false,
        "existingLiterals": 10,
    -   "limitsRejected": true,
    +   "limitsRejected": false,
        "maxLimit": Object {
    -     "payload": Object {
    -       "limit": 200,
    -       "type": "list_conversations",
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
    -     "valid": true,
    -   },
        "minLimit": Object {
    -     "payload": Object {
    -       "limit": 1,
    -       "type": "list_conversations",
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
    -     "valid": true,
    -   },
        "paged": Object {
    -     "payload": Object {
    -       "before": Object {
    -         "sessionId": "s2",
    -         "updatedAt": "2026-06-01T12:00:02.000Z",
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },
    -       "limit": 2,
    -       "type": "list_conversations",
    -     },
    -     "valid": true,
    -   },
    -   "stringCursorNamesBefore": true,
    +   "stringCursorNamesBefore": false,
      }

  ● delivering a user conversation list over the WebSocket protocol › lists the connected user conversations newest first, pages, and resumes a row

    expect(received).toEqual(expected) // deep equality

    - Expected  - 38
    + Received  +  8

    @@ -4,50 +4,20 @@
          "message",
          "resumed",
          "sessionId",
          "type",
        ],
    -   "firstCallUser": "u1",
    +   "firstCallUser": undefined,
        "firstReplyTypes": Array [
    -     "conversation_list",
    +     "error",
          "pong",
        ],
    +   "listed": Array [],
    +   "pagedCall": undefined,
    +   "pagedIds": Array [],
        "resumed": Object {
    -     "entryCount": 2,
    -     "flag": true,
    -     "replayed": 2,
    +     "entryCount": undefined,
    +     "flag": false,
    +     "replayed": 0,
        },
        "unsolicitedOnConnect": Array [],
      }

  ● delivering a user conversation list over the WebSocket protocol › answers list_conversations ahead of a streaming user_message

    expect(received).toEqual(expected) // deep equality

      Object {
    -   "hasList": true,
    -   "listBeforeStreamEnd": true,
    +   "hasList": false,
    +   "listBeforeStreamEnd": false,
      }

  ● delivering a user conversation list over the WebSocket protocol › answers UNSUPPORTED or redacted SERVER_ERROR and warns without resume

    expect(received).toEqual(expected) // deep equality

      Object {
        "explicitlyOff": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "types": Array [
            "error",
            "pong",
          ],
        },
        "exportedSurface": Object {
    -     "errorClass": "function",
    -     "errorCode": "UNSUPPORTED",
    +     "errorClass": "undefined",
    +     "errorCode": undefined,
        },
        "findlessMongo": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
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
        "transientFailure": Object {
          "loggedContentOmitted": true,
    -     "loggedSessionId": true,
    +     "loggedSessionId": false,
          "messageRedacted": true,
          "reply": Object {
    -       "code": "SERVER_ERROR",
    +       "code": "INVALID_MESSAGE",
            "types": Array [
              "error",
              "pong",
            ],
          },
        },
    -   "warnedAboutResume": true,
    +   "warnedAboutResume": false,
      }

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}