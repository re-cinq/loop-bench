Added executable acceptance tests in `src/conversationList.acceptance.test.ts` and recorded the Definition of Done in `.lore/dod.md` (committed as `4efcc95` and pushed to `origin/loop-bench/144`, up to date with `origin/main`).

Command run:
```bash
NODE_OPTIONS='--experimental-vm-modules' npx jest --runTestsByPath src/conversationList.acceptance.test.ts
```

Observed failure output:
```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a user conversation list over WebSocket › delivers the authenticated user's conversation list newest-first with paging, ignores any userId in the frame, and lets a client resume a listed id

    expect(received).toEqual(expected) // deep equality

    - Expected  - 46
    + Received  +  9

      Object {
    -   "calls": Array [
    ...
    +   "calls": Array [],
        "connectedKeys": Array [
          "examplePrompts",
          "message",
          "resumed",
          "sessionId",
          "type",
        ],
        "fullTurnTypes": Array [
    -     "conversation_list",
    +     "error",
        ],
    -   "listedIds": Array ["newest", "tie-zeta", "tie-alpha", "older", ...],
    +   "listedIds": Array [],
    ...
        "resumed": Object {
    -     "entryCount": 2,
    -     "replayedContents": Array ["latest question", "latest answer"],
    -     "resumed": true,
    -     "sessionId": "newest",
    +     "entryCount": undefined,
    +     "replayedContents": Array [],
    +     "resumed": false,
    +     "sessionId": "8de169bf-65e1-45f5-b6e9-3db5a63f10f7",
        },
      }

  ● delivering a user conversation list over WebSocket › answers list_conversations ahead of an in-flight turn without waiting on the session lock

    - Expected  - 1
    + Received  + 1

      Array [
    -   "conversation_list",
    +   "error",
      ]

  ● delivering a user conversation list over WebSocket › validates list_conversations and rejects invalid limit or before cursors naming the field

    -   "namedField": true,
    +   "namedField": false,
    ...
        "validBare": Object {
    -     "data": Object { "type": "list_conversations" },
    -     "valid": true,
    +     "error": "Unknown message type: list_conversations",
    +     "valid": false,
        },

  ● delivering a user conversation list over WebSocket › answers UNSUPPORTED when history is off, listFor is absent, or the store throws StoreCannotList, and SERVER_ERROR without leaking store details when listFor fails

        "failingFrame": Object {
    -     "code": "SERVER_ERROR",
    +     "code": "INVALID_MESSAGE",
        "historyOff": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
    -   "loggedSessionId": true,
    +   "loggedSessionId": false,
        "mongoMissingFind": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
    -   "warnsWithoutResume": true,
    +   "warnsWithoutResume": false,
        "withoutListFor": Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}