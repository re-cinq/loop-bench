The acceptance tests for #144 are committed and pushed to `loop-bench/144`, and the branch is in sync with its upstream. All three fail for the right reason: the socket has no `list_conversations` handling yet.

**Strategy: `direct`.** `createServer` with a real WebSocket client already drives the message path, so the tests reach the real entry point. `InMemorySessionStore.listFor` from #143/#146 is on `origin/main`.

**Files**
- `src/transport/listConversations.acceptance.test.ts`: three tests.
  1. With `history` enabled, a user's three conversations come back as one `conversation_list`, newest first, with ISO times and no trailing `stream_end`.
  2. A frame carrying `userId: 'u2'` from `u1` gets only `u1`'s conversations.
  3. With `history` absent, the frame gets an `error` with code `UNSUPPORTED` and no list.
- `.lore/dod.md`: the central claim quoted from the ticket, the `direct` strategy, the three tests, facets, out of scope, and a run record.

**Red bar (run here, only this file):**
```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/listConversations.acceptance.test.ts
...
Tests:       3 failed, 3 total
```
Each failure shows the server replying `INVALID_MESSAGE`, for example:
```
+   "code": "INVALID_MESSAGE",
+   "message": "Unknown message type: list_conversations",
+   "type": "error",
```
The third test shows `INVALID_MESSAGE` where `UNSUPPORTED` is expected. That is the honest reason: the frame does not exist yet.

**Choices to check**
- The tests go through `createServer` over a real socket, not `createMessageHandler`, so no signature is guessed.
- The `history` option is spread into `createServer` untyped. Without that, ts-jest would fail the whole file on a type error instead of on behaviour.
- The cross-user test checks the returned rows, not the argument passed to `listFor`, because a real store is used.
- No spec anchor is stamped. The websocket spec has no un-linked statement for this behaviour yet; the build adds the statements and their links.
- I did not run lint, typecheck or the formatter beyond prettier on the new file. CI runs the Jest `Test` step, which runs `npm test`.
- The branch merged `origin/main` cleanly with no changes needed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}