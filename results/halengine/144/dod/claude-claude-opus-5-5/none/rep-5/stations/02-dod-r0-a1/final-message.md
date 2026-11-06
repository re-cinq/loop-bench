The acceptance tests for #144 were already on the branch from an earlier round. I checked them against the ticket and ran them: all five fail, and for the ticket's reason. The server doesn't know the `list_conversations` frame yet. I changed one thing: `.lore/dod.md` quoted a side sentence, so it now opens with the reporter's actual complaint: "It does not give a **client** anything: the browser holding the socket cannot reach the store…". That's committed and pushed. The branch already contains `origin/main`, so the merge brought in nothing, and it is not ahead of its upstream.

**Strategy: `direct`.** The tests start the real server from `createServer` (via `src/transport/wsTestSupport.ts`) with a real `InMemorySessionStore`, send frames over a real socket, and call `validateMessage` directly.

The five tests are all in `src/transport/conversationList.acceptance.test.ts`:
1. Validation: a bare frame is accepted; a bad `limit` (0, 201, 1.5, `'10'`) or a bad `before` cursor (an unparseable time, or a missing half) is rejected with a message naming the field.
2. With history on, one `conversation_list` with three rows, newest first, with ISO times and no `stream_end`. The store's `listFor` is called with the connection's own user, not the `userId` the frame carries, and gets `{limit, before}` as sent. Reconnecting with the first row's id gives `resumed: true` and a replay.
3. `UNSUPPORTED` when history is off, and when the store has no `listFor`.
4. `SERVER_ERROR` when `listFor` throws: the store's error text doesn't reach the client, the log names the session, and the socket stays open.
5. The list is answered while a `user_message` is still streaming, before that turn's `stream_end`.

The protocol spec's new § 4.3 links each statement to its test, and the line numbers match.

Run with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`. The output (stack lines removed) shows the frame is unknown:
```
● … validates list_conversations …
    +   "bare": "Unknown message type: list_conversations",
    +   "zero": "Unknown message type: list_conversations",
● … answers the connection's own user, never the frame's …
    +   "listedFor": Array [],
    +   "order": Array [],
    -     "conversation_list",
    +     "error",
● … answers UNSUPPORTED and no list …
    -     "error:UNSUPPORTED",
    +     "error:INVALID_MESSAGE",
● … answers a listFor that rejects with SERVER_ERROR …
    -       "code": "SERVER_ERROR",
    +       "code": "INVALID_MESSAGE",
    -   "loggedSession": true,
    +   "loggedSession": false,
● … answers list_conversations while a user_message is still streaming …
    expect(received).toEqual(expected)
```
My output cut off before the diff for the fifth test, so its exact values aren't shown, but the test does fail.

Some acceptance criteria get no test, on purpose:
- **Left to the next round's edits and CI:** the `messages.ts` diff touching no existing line, the CHANGELOG entry, the `npm run docs:fix` regeneration, the MINOR version bump, and `npm run verify`.
- **Not a separate test:** that `ConnectedMessage` is unchanged. The resume check in test 2 already exercises it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}