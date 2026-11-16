Created and pushed `.lore/dod.md`, `src/conversationList.acceptance.test.ts` (4 acceptance tests), and the corresponding protocol statements and `[validated by: ...]` anchors in `specs/hal-engine-websocket-protocol/spec.md` on `origin/loop-bench/144` (commit `284d945`, up to date with `origin/main`).

### Red acceptance test run

Command:
```bash
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/conversationList.acceptance.test.ts
```

Failure output:
```text
FAIL src/conversationList.acceptance.test.ts
  ● conversation list over the WebSocket protocol › lists only the authenticated user conversations newest first as ISO summaries, pages via before, omits stream_end, and resumes a listed id

    expect(received).toEqual(expected) // deep equality

    - Expected  - 37
    + Received  + 10
...
    -   "isoDates": true,
    +   "isoDates": false,
        "leakedSecret": false,
    -   "page1Ids": Array [
    -     "u1-c3",
    -     "u1-c2",
    -   ],
    +   "page1Ids": Array [],
        "page1Types": Array [
    -     "conversation_list",
    -   ],
    +     "error",
        ],
    +   "page2Ids": Array [],
        "page2Types": Array [
    -     "conversation_list",
    -   ],
    +     "error",
        ],
    +   "recordedCalls": Array [],
...

  ● conversation list over the WebSocket protocol › answers UNSUPPORTED when history is off or the store cannot list, and SERVER_ERROR without store detail when listFor rejects

    expect(received).toEqual(expected) // deep equality

    - Expected  - 5
    + Received  + 5
...
        "failing": Object {
    -     "code": "SERVER_ERROR",
    +     "code": "INVALID_MESSAGE",
...
        "fiveMember": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
...
        "historyOff": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
...
        "mongoNoFind": Array [
          Object {
    -       "code": "UNSUPPORTED",
    +       "code": "INVALID_MESSAGE",
...

  ● conversation list over the WebSocket protocol › accepts a bare list_conversations frame and rejects invalid limit or before fields with INVALID_MESSAGE naming the field

    expect(received).toEqual(expected) // deep equality
...
        "bareTypes": Array [
    -     "conversation_list",
    +     "error",
          "pong",
        ],
...
      "namesBefore": false (expected true for beforeBadDate, beforeOnlySessionId, beforeOnlyUpdatedAt, beforeString)
      "namesLimit": false (expected true for limitFloat, limitOver, limitString, limitZero)

  ● conversation list over the WebSocket protocol › answers list_conversations before stream_end while a user_message turn is streaming on the same session

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      Object {
        "endedType": "stream_end",
    -   "replyType": "conversation_list",
    +   "replyType": "error",
        "sawStreamEndBeforeReply": false,
      }

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
Snapshots:   0 total
Time:        0.484 s, estimated 1 s
Ran all test suites within paths "src/conversationList.acceptance.test.ts".
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}