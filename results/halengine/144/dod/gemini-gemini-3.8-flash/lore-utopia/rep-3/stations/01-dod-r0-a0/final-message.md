Defined DONE for ticket #144 with executable acceptance tests in `src/transport/conversationList.acceptance.test.ts`.

### Acceptance Tests & Triage

- **Triage Strategy:** `direct` — The live WebSocket transport (`createServer` / `startEngineWith`) provides the direct entry point. Acceptance tests establish real WebSocket connections over the port, send `list_conversations` frames, and observe wire responses directly.
- **Traceability:** Spec statements added to `specs/hal-engine-websocket-protocol/spec.md` with parenthetical `[validated by: ...]` citations pointing to declarations in `src/transport/conversationList.acceptance.test.ts`.
- **DoD:** Defined in `.lore/dod.md` quoting the ticket claim verbatim.

### Test Execution & Failure Output

Running `node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`:

```text
FAIL src/transport/conversationList.acceptance.test.ts
  ● the conversation list frame › answers the connecting user's conversations newest first, with both times as ISO strings, and hands a client an id it can rejoin the conversation with

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
    -     "e27f4da6-290a-4717-b79f-f31c481adf96",
    -   ],
    +   "newest": undefined,
    +   "order": Array [],
        "types": Array [
          "connected",
    -     "conversation_list",
    +     "error",
        ],
      }

      100 |       order: rows.map(row => row.sessionId),
      101 |       newest: rows[0],
    > 102 |     }).toEqual({
          |        ^
      103 |       types: ['connected', 'conversation_list'],
      104 |       order: ['newest', 'middle', 'oldest', idOf()],
      105 |       newest: {

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:102:8)

  ● the conversation list frame › refuses the list_conversations frame with UNSUPPORTED when history is not enabled

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "code": "UNSUPPORTED",
    -   "message": StringMatching /unsupported|history/i,
    +   "code": "INVALID_MESSAGE",
    +   "message": "Unknown message type: list_conversations",
        "type": "error",
      }

      133 |     const answered = await reply;
      134 |
    > 135 |     expect(answered).toEqual({
          |                      ^
      136 |       type: 'error',
      137 |       code: 'UNSUPPORTED',
      138 |       message: expect.stringMatching(/unsupported|history/i) as unknown as string,

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:135:22)

  ● the conversation list frame › answers a list in the middle of a streaming turn, before that turn ends

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

      174 |     await ended;
      175 |
    > 176 |     expect(order).toEqual([
          |                   ^
      177 |       'connected',
      178 |       'entry_upsert',
      179 |       'conversation_list',

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:176:19)

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
Snapshots:   0 total
Time:        0.365 s, estimated 1 s
Ran all test suites matching src/transport/conversationList.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}