I wrote five acceptance tests for #144, and all five fail today because the server doesn't recognise the `list_conversations` frame. They're committed and pushed to `loop-bench/144`. Merging `origin/main` brought in nothing new, and the branch is level with its upstream.

**Strategy: `direct`.** The tests go through the real entry points: `createServer` over a real WebSocket with a real `InMemorySessionStore`, and `validateMessage`. They're all in a new file, `src/transport/conversationList.acceptance.test.ts`:

1. **Validation:** `list_conversations` is valid with no fields. `limit` must be an integer from 1 to 200, and `before` must be a full `{updatedAt, sessionId}` cursor. Bad values are rejected with an error that names the field.
2. **The list itself:** one `conversation_list` with three summaries, newest first, times as ISO strings, and no `stream_end`. A `userId` sent in the frame is ignored. The store's `listFor` is recorded being called with the connected user and the `limit` and `before` the frame sent.
3. **Refusals:**
   - With history off, a store with no `listFor`, or a store throwing `StoreCannotList`, the answer is an `UNSUPPORTED` error.
   - When the store fails, the answer is `SERVER_ERROR` with no store detail, and the socket stays open.
   - The failure is logged with the session id and no conversation content.
4. **Not stuck behind a reply:** a list request sent while a reply is streaming is answered before that reply's `stream_end`.
5. **Opening a conversation:** a client takes an id from the list and reconnects with `?sessionId=`, which the existing resume path (#45) handles, replay included.

Run with `NODE_OPTIONS=--experimental-vm-modules npx jest src/transport/conversationList.acceptance.test.ts`:

```
Tests:       5 failed, 5 total
-     "data": Object { "type": "list_conversations" }, "valid": true,
+     "error": "Unknown message type: list_conversations", "valid": false,
...
+       "code": "INVALID_MESSAGE",
+       "message": "Unknown message type: list_conversations",
+       "type": "error",
...
-         "code": "UNSUPPORTED",
+         "code": "INVALID_MESSAGE",
...
-       "code": "SERVER_ERROR",
+       "code": "INVALID_MESSAGE",
...
-   "listed": true,
+   "listed": false,
...
-   "picked": "c-old",
+   "picked": "undefined",
```

Things the next round should know:
- **Only the validator test is in the typechecker's path.** The other four pass a `history` option that `createServer` doesn't have yet and use `engine.StoreCannotList`, which isn't exported yet. Jest doesn't check types, so these fail on behaviour, but CI's typecheck will also go red until both exist.
- **`StoreCannotList` is reached through `import * as engine`.** A named import of a missing export makes the whole ES-module suite fail to load, which would hide the other four tests behind one reason.
- **The tests reconnect to an existing conversation (`?sessionId=c-new`) with resume on.** A fresh connection would add a fourth, empty conversation of its own, which the ticket says should be listed, and the "three summaries" check would then not hold.
- **Spec links:** I added § 4.3 `list_conversations` to `specs/hal-engine-websocket-protocol/spec.md`, with five statements each citing its test.
- **No spec anchor stamped in the tests:** the repo's test-listing script has no `spec` field to stamp.
- **Not yet in the spec:**
  - the § 5 field tables for `conversation_list` and the `UNSUPPORTED` code;
  - the GDPR statements;
  - the conversation-list spec, CHANGELOG, docs and version bump.

  These are listed as remaining steps in `.lore/dod.md`.
- **Noise in the output:** a few "disconnected" lines are printed after each test. They're harmless and come from the server logging closes after the test's captured logger has been removed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}