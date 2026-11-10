### Definition of Done & Strategy

The ticket requires delivering a user's conversation list over the WebSocket protocol. A direct seam exists at `createServer` and the WebSocket transport layer: clients connect with authentication and exchange JSON frames over real WebSockets.

Three acceptance tests were added in `src/transport/conversationList.acceptance.test.ts`:
1. **delivers the authenticated user's conversation list over websocket, with iso timestamps and paging, isolated from other users** — Verifies that sending `list_conversations` returns a single `conversation_list` carrying ISO-timestamped summaries for the authenticated user only (ignoring any `userId` on the frame), supports cursor-based paging with `limit` and composite `before`, and allows subsequent reconnect/resume using a listed session ID.
2. **refuses list_conversations with an UNSUPPORTED error frame when history is not enabled or the store cannot list** — Verifies that when `transport.history` is omitted or disabled, or when the session store lacks a `listFor` implementation, the server responds with an `error` frame carrying code `UNSUPPORTED`.
3. **answers list_conversations off the per-session lock without waiting for a streaming user_message turn to finish** — Verifies that `list_conversations` sent during an in-flight streaming `user_message` turn is answered immediately off the lock and arrives before `stream_end`.

### Actual Test Failure Output

Running `node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`:

```text
FAIL src/transport/conversationList.acceptance.test.ts
  ● conversation list over websocket › delivers the authenticated user's conversation list over websocket, with iso timestamps and paging, isolated from other users

    expect(received).toBe(expected) // Object.is equality

    Expected: "conversation_list"
    Received: "error"

      125 |
      126 |     const response = await nextMessage();
    > 127 |     expect(response.type).toBe('conversation_list');
          |                           ^
      128 |     expect(response).toEqual({
      129 |       type: 'conversation_list',
      130 |       conversations: [

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:127:27)

  ● conversation list over websocket › refuses list_conversations with an UNSUPPORTED error frame when history is not enabled or the store cannot list

    expect(received).toMatchObject(expected)

    - Expected  - 1
    + Received  + 1

      Object {
    -   "code": "UNSUPPORTED",
    +   "code": "INVALID_MESSAGE",
        "type": "error",
      }

      196 |     client1.send(JSON.stringify({type: 'list_conversations'}));
      197 |     const responseDisabled = await nextMessage1();
    > 198 |     expect(responseDisabled).toMatchObject({
          |                              ^
      199 |       type: 'error',
      200 |       code: 'UNSUPPORTED',
      201 |     });

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:198:30)

  ● conversation list over websocket › answers list_conversations off the per-session lock without waiting for a streaming user_message turn to finish

    expect(received).toContain(expected) // indexOf

    Expected value: "conversation_list"
    Received array: ["entry_upsert", "entry_delta", "error"]

      266 |         }
      267 |       }
    > 268 |       expect(seenTypes).toContain('conversation_list');
          |                         ^
      269 |       expect(seenTypes).not.toContain('stream_end');
      270 |     } finally {
      271 |       releaseStream();

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:268:25)

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
Snapshots:   0 total
Time:        0.322 s, estimated 1 s
Ran all test suites matching src/transport/conversationList.acceptance.test.ts.
```

The tests and `.lore/dod.md` have been formatted with Prettier, committed, and pushed to `origin HEAD`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}