I wrote five acceptance tests for #144, ran them, and all five fail because the server doesn't support the conversation list yet. They're committed and pushed to `loop-bench/144`, which is already up to date with `origin/main` and level with its upstream.

**Strategy: `direct`.** The tests go through the real entry points: `validateMessage`, and `createServer` over a real WebSocket using a real `InMemorySessionStore`. The only stand-ins are two small stores built on the real one: one records what `listFor` is asked, and one leaves `listFor` out.

**Tests**, all in `src/transport/conversationList.acceptance.test.ts`:
1. `validateMessage` accepts a bare `list_conversations`, and rejects each bad `limit` (0, 201, 1.5, `'10'`) and each bad `before` with an error naming the field.
2. With history on, one `conversation_list` comes back with no `stream_end`: three conversations, newest first, times as ISO strings. A frame that carries `userId: 'u2'` still gets user u1's list, and `listFor` is recorded being called with `'u1'` and `{limit, before}` exactly as the frame sent them.
3. With history off, or a store that has no `listFor`, the answer is one `UNSUPPORTED` error and no list. When `listFor` throws, the answer is one `SERVER_ERROR` with no store detail, the socket stays open, and the error is logged with the session id.
4. A list request sent while a reply is still streaming is answered before that turn's `stream_end`.
5. Taking an id from the list and reconnecting with `?sessionId=` gives `resumed: true` and the replay.

**Failure output** (`npm test -- src/transport/conversationList.acceptance.test.ts`, 5 failed of 5). Every failure comes from the frame being an unknown type today:
```
-   "bare": "valid",
+   "bare": "Unknown message type: list_conversations",
...
-     "error:UNSUPPORTED",
+     "error:INVALID_MESSAGE",
...
-     "error:SERVER_ERROR",
+     "error:INVALID_MESSAGE",
...
    Array [
-   "conversation_list",
      "stream_end",
    ]
...
-   "picked": "c-mid",
+   "picked": "undefined",
-     "resumed": true,
+     "resumed": false,
```
Test 2 fails the same way: the answer is an `INVALID_MESSAGE` error, and `listFor` is never called.

**Also committed:**
- **Spec:** a new § 4.3 `list_conversations` in `specs/hal-engine-websocket-protocol/spec.md`, with the GDPR statement and six rules, each linked to its test. I didn't change any `Status` row.
- **`.lore/dod.md`:** the strategy, the five tests, the implementation steps and what's out of scope.

**Things to know:**
- The tests pass `history` to `createServer` as a variable rather than inline. That way the file compiles before the option's type exists, and the failures are about behaviour, not type errors.
- `StoreCannotList` has no acceptance test. Importing a class that doesn't exist yet would break the test file instead of failing on behaviour. It's listed in the DoD as something the next round should test when it adds the class.
- Two criteria are left to review and CI rather than tests: the "only additive lines in `messages.ts`" requirement and the docs/CHANGELOG work.
- The repo's formatter only covers `src`, `scripts` and `smoke`, so I formatted the test file only. Running Prettier on the spec rewrote unrelated tables, so I reverted that and wrote the spec section by hand.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}