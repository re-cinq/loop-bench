Acceptance tests defining the Definition of Done for Ticket #144 ("Deliver a user's conversation list over the WebSocket protocol") have been authored, executed, committed, and pushed.

### Acceptance Test Strategy

- **Strategy: `direct`** — The WebSocket transport (`createServer` / `createMessageHandler`) provides the entry point for client frames. Acceptance tests connect real WebSocket clients to an active engine, exercising the missing protocol behavior on the wire (`list_conversations` and `conversation_list`).
- Three acceptance tests in `src/transport/conversationList.acceptance.test.ts` verify:
  1. `delivers the authenticated user's conversation list newest first over the socket when history is enabled` — asserts delivery of `conversation_list` with ISO strings, newest-first ordering, no `stream_end`, queries `store.listFor` with the authenticated `ws.userId` (ignoring any `userId` sent in the frame), and verifies session rejoining with `?sessionId=`.
  2. `answers list_conversations while a turn is streaming without waiting on the turn lock` — asserts that `list_conversations` runs on the non-locking path, arriving before `stream_end` of a concurrent streaming turn.
  3. `refuses list_conversations with code UNSUPPORTED when history is not enabled` — asserts that `list_conversations` is refused with an `error` frame of code `UNSUPPORTED` when history is not turned on.

### Actual Failure Output

Running `npm test -- src/transport/conversationList.acceptance.test.ts`:

```
> @re-cinq/hal-engine@0.5.0 test
> node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts

(node:3065542) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
FAIL src/transport/conversationList.acceptance.test.ts
  ● the conversation list acceptance criteria › delivers the authenticated user's conversation list newest first over the socket when history is enabled

    expect(received).toEqual(expected) // deep equality

    - Expected  - 13
    + Received  +  3

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
    -     "40992586-bdcb-44ab-ab55-292713922a59",
    -   ],
    +   "newest": undefined,
    +   "order": Array [],
        "types": Array [
          "connected",
    -     "conversation_list",
    +     "error",
        ],
      }

      114 |       order: rows.map(row => row.sessionId),
      115 |       newest: rows[0],
    > 116 |     }).toEqual({
          |        ^
      117 |       types: ['connected', 'conversation_list'],
      118 |       order: ['newest', 'middle', 'oldest', idOf()],
      119 |       newest: {

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:116:8)

  ● the conversation list acceptance criteria › answers list_conversations while a turn is streaming without waiting on the turn lock

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

    @@ -1,9 +1,9 @@
      Array [
        "connected",
    +   "error",
        "entry_upsert",
    -   "conversation_list",
        "entry_upsert",
        "entry_delta",
        "entry_delta",
        "entry_commit",
        "stream_end",

      179 |
      180 |     // The list frame must arrive before stream_end and between user_message and assistant streaming
    > 181 |     expect(order).toEqual([
          |                   ^
      182 |       'connected',
      183 |       'entry_upsert',
      184 |       'conversation_list',

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:181:19)

  ● the conversation list acceptance criteria › refuses list_conversations with code UNSUPPORTED when history is not enabled

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 3

    - ObjectContaining {
    -   "code": "UNSUPPORTED",
    + Object {
    +   "code": "INVALID_MESSAGE",
    +   "message": "Unknown message type: list_conversations",
        "type": "error",
      }

      196 |     const {reply} = asks(url, {type: 'list_conversations'}, 'error');
      197 |
    > 198 |     expect(await reply).toEqual(
          |                         ^
      199 |       expect.objectContaining({
      200 |         type: 'error',
      201 |         code: 'UNSUPPORTED',

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:198:25)

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
Snapshots:   0 total
Time:        0.244 s, estimated 1 s
Ran all test suites matching src/transport/conversationList.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}