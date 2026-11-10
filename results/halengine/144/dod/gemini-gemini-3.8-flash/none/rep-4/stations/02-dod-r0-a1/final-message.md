## Definition of Done and Acceptance Tests

Defined acceptance criteria in `.lore/dod.md` and created acceptance tests in `src/transport/conversationList.acceptance.test.ts` using the `direct` triage strategy.

The acceptance tests exercise the real WebSocket entry point via `createServer`:
1. **delivers the authenticated user conversation list over WebSocket and allows reconnecting to a listed session** — Asserts that `list_conversations` with `history: {enabled: true}` queries the store for the connection's authenticated user (`ws.userId`), ignoring any `userId` sent in the frame, and returns a `conversation_list` frame carrying summaries with ISO string timestamps, newest first; tests composite cursor paging with `limit` and `before`; reconnects with `?sessionId=<id>` and verifies session resumption and replay.
2. **answers list_conversations immediately without waiting for an active streaming turn to finish** — Sends `list_conversations` while a streaming `user_message` turn is in progress, proving that handling runs outside the per-session turn lock alongside `ping` and returns `conversation_list` before `stream_end`.
3. **refuses list_conversations with UNSUPPORTED when history is disabled or the store cannot list** — Asserts that `list_conversations` is refused with an `error` frame carrying code `UNSUPPORTED` when `history` is omitted (absent / default), when `history: {enabled: false}` is explicitly passed, or when the store implements no `listFor`.

### Failure Output

Command run: `npm test src/transport/conversationList.acceptance.test.ts`

```text
> @re-cinq/hal-engine@0.5.0 test
> node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts

FAIL src/transport/conversationList.acceptance.test.ts
  ● delivering a conversation list over the WebSocket protocol › delivers the authenticated user conversation list over WebSocket and allows reconnecting to a listed session

    expect(received).toEqual(expected) // deep equality

    - Expected  - 15
    + Received  +  3

      Object {
    -   "conversations": Array [
    -     Object {
    -       "createdAt": StringMatching /^\d{4}-\d{2}-\d{2}T/,
    -       "entryCount": 1,
    -       "sessionId": "s3",
    -       "updatedAt": StringMatching /^\d{4}-\d{2}-\d{2}T/,
    -     },
    -     Object {
    -       "createdAt": StringMatching /^\d{4}-\d{2}-\d{2}T/,
    -       "entryCount": 1,
    -       "sessionId": "s2",
    -       "updatedAt": StringMatching /^\d{4}-\d{2}-\d{2}T/,
    -     },
    -   ],
    -   "type": "conversation_list",
    +   "code": "INVALID_MESSAGE",
    +   "message": "Unknown message type: list_conversations",
    +   "type": "error",
      }

      160 |     const firstPage = await nextFrame(client);
      161 |
    > 162 |     expect(firstPage).toEqual({
          |                       ^
      163 |       type: 'conversation_list',
      164 |       conversations: [
      165 |         {

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:162:23)

  ● delivering a conversation list over the WebSocket protocol › answers list_conversations immediately without waiting for an active streaming turn to finish

    expect(received).toMatchObject(expected)

    - Expected  - 1
    + Received  + 1

      Object {
    -   "type": "conversation_list",
    +   "type": "error",
      }

      283 |
      284 |       // Must be answered with conversation_list before the turn finishes
    > 285 |       expect(receivedFrame).toMatchObject({
          |                             ^
      286 |         type: 'conversation_list',
      287 |       });
      288 |     } finally {

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:285:29)

  ● delivering a conversation list over the WebSocket protocol › refuses list_conversations with UNSUPPORTED when history is disabled or the store cannot list

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      Object {
    -   "code": "UNSUPPORTED",
    +   "code": "INVALID_MESSAGE",
        "message": Any<String>,
        "type": "error",
      }

      305 |     const errorAbsent = await nextFrame(clientAbsent);
      306 |
    > 307 |     expect(errorAbsent).toEqual({
          |                         ^
      308 |       type: 'error',
      309 |       code: 'UNSUPPORTED',
      310 |       message: expect.any(String),

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:307:25)

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
Snapshots:   0 total
Time:        0.27 s, estimated 1 s
Ran all test suites matching src/transport/conversationList.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}