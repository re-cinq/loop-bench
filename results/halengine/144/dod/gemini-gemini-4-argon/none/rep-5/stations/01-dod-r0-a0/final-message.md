Acceptance tests for Ticket #144 (`src/transport/conversationList.acceptance.test.ts`), spec traceability links (`specs/hal-engine-conversation-list/spec.md`), and `.lore/dod.md` have been committed and pushed.

### Red Test Output

```text
FAIL src/transport/conversationList.acceptance.test.ts
  ● conversation list over the WebSocket protocol › delivers the initial page after connected and replay when conversations is on, and omits it when off or unsupported

    expect(received).toEqual(expected) // deep equality

    - Expected  - 12
    + Received  +  3

      Object {
    -   "firstRowKeys": Array [
    -     "createdAt",
    -     "entryCount",
    -     "sessionId",
    -     "updatedAt",
    -   ],
    -   "isoDates": true,
    -   "listedIds": Array [
    -     "s2",
    -     "s1",
    -   ],
    +   "firstRowKeys": Array [],
    +   "isoDates": false,
    +   "listedIds": undefined,
        "noListTypes": Array [
          "connected",
        ],
        "offTypes": Array [
          "connected",
          "entry_upsert",
        ],
        "resumedOrder": Array [
          "connected",
          "entry_upsert",
    -     "conversations",
        ],
      }

  ● conversation list over the WebSocket protocol › answers list_conversations at once during a turn, pages with before and limit, and rejects a malformed frame without stream_end

    expect(received).toEqual(expected) // deep equality

    - Expected  - 7
    + Received  + 3

      Object {
        "answeredBeforeStreamEnd": true,
    -   "firstPageIds": Array [
    -     "s2",
    -   ],
    -   "firstPageType": "conversations",
    +   "firstPageIds": undefined,
    +   "firstPageType": "error",
        "malformedCode": "INVALID_MESSAGE",
        "noStreamEndAfterMalformed": true,
    -   "secondPageIds": Array [
    -     "s1",
    -   ],
    +   "secondPageIds": undefined,
      }

  ● conversation list over the WebSocket protocol › survives a throwing listFor on connect without evicting the session, and answers SERVER_ERROR on a request failure

    expect(received).toEqual(expected) // deep equality

    - Expected  - 5
    + Received  + 3

      Object {
        "connectedType": "connected",
    -   "errorCode": "SERVER_ERROR",
    +   "errorCode": "INVALID_MESSAGE",
        "evicted": Array [],
    -   "recoveredIds": Array [
    -     "32f76482-ed37-4805-a0d5-283e91349d24",
    -   ],
    -   "recoveredType": "conversations",
    +   "recoveredIds": undefined,
    +   "recoveredType": "error",
      }

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}