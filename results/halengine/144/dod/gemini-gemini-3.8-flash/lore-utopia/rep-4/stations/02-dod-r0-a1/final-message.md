Defined the Definition of Done for ticket #144 as executable red acceptance tests in `src/transport/conversationList.acceptance.test.ts`.

### Strategy

`direct` — WebSocket transport already authenticates connections, sets `ws.userId`, and routes messages. Acceptance tests directly exercise real WebSocket client connections against `createServer` with `history: {enabled: true}` and verify protocol frames over the wire.

### Acceptance Tests

1. `answers the user's conversations newest first, with both times as ISO strings, ignoring any userId in the frame` — Pins delivering the authenticated user's conversations, sorting newest first, encoding timestamps as ISO strings, ignoring frame-supplied user IDs, and avoiding `stream_end`.
2. `refuses the frame when conversation history is not turned on` — Pins answering `list_conversations` with an `error` frame whose code is `UNSUPPORTED` when `history` is absent or disabled.
3. `answers a list in the middle of a streaming turn, before that turn ends` — Pins answering `list_conversations` off the per-session lock so it is not queued behind streaming turns.

### Test Output

```
FAIL src/transport/conversationList.acceptance.test.ts
  ● the conversation list frame › answers the user's conversations newest first, with both times as ISO strings, ignoring any userId in the frame

    expect(received).toEqual(expected) // deep equality

    - Expected  - 14
    + Received  +  4

      Object {
    -   "newest": Object {
    -     "createdAt": StringMatching /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    -     "entryCount": 1,
    -     "sessionId": "newest",
    -     "updatedAt": "2099-01-01T00:00:02.000Z",
    -   },
    -   "order": Array [
    -     "newest",
    -     "middle",
    -     "oldest",
    -     "22e6e3a3-d611-456f-a811-9762c0b2c8a4",
    -   ],
    -   "queriedUser": "u1",
    +   "newest": undefined,
    +   "order": Array [],
    +   "queriedUser": undefined,
        "types": Array [
          "connected",
    -     "conversation_list",
    +     "error",
        ],
      }

       99 |       newest: rows[0],
      100 |       queriedUser: recordedUsers[0],
    > 101 |     }).toEqual({
          |        ^
      102 |       types: ['connected', 'conversation_list'],
      103 |       order: ['newest', 'middle', 'oldest', idOf()],
      104 |       newest: {

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:101:8)

  ● the conversation list frame › refuses the frame when conversation history is not turned on

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      Object {
    -   "code": "UNSUPPORTED",
    +   "code": "INVALID_MESSAGE",
        "message": Any<String>,
        "type": "error",
      }

      118 |     const reply = await ask(client, {type: 'list_conversations'});
      119 |
    > 120 |     expect(reply).toEqual({
          |                   ^
      121 |       type: 'error',
      122 |       code: 'UNSUPPORTED',
      123 |       message: expect.any(String),

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:120:19)

  ● the conversation list frame › answers a list in the middle of a streaming turn, before that turn ends

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 2

      Array [
        "connected",
    +   "error",
        "entry_upsert",
    -   "conversation_list",
        "entry_upsert",
    +   "entry_delta",
        "entry_delta",
        "entry_commit",
        "stream_end",
      ]

      159 |     await ended;
      160 |
    > 161 |     expect(order).toEqual([
          |                   ^
      162 |       'connected',
      163 |       'entry_upsert',
      164 |       'conversation_list',

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:161:19)

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
Snapshots:   0 total
Time:        0.266 s, estimated 1 s
Ran all test suites matching src/transport/conversationList.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}