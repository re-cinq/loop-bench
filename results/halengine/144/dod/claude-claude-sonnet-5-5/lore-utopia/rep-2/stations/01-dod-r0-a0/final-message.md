I committed and pushed three red acceptance tests for #144. They run through a real `createServer` and a real socket, and each fails because the feature is missing. The branch is merged with `origin/main` and not ahead of its upstream.

Strategy: `direct`.

Central claim in `.lore/dod.md`: "Deliver a user's conversation list over the WebSocket protocol".

The tests are in `src/transport/ws/conversationList.acceptance.test.ts`. I ran them with `node --experimental-vm-modules node_modules/jest/bin/jest.js <file>`, and 3 of 3 failed.

1. **Own list, newest first.**
   - It expects one `conversation_list` and no `stream_end`, with `listFor` called with `ws.userId` and the frame's `limit`.
   - A `userId` for another user in the frame must be ignored, and the times must be ISO strings.
   - Failure: `expect(lists).toHaveLength(1)`: Expected length 1, Received length 0. The frame is currently rejected.
2. **`UNSUPPORTED` error.**
   - With `history` off, or with a store that has no `listFor`, the answer must be one `error` frame with code `UNSUPPORTED` and no list.
   - Failure: Expected `"UNSUPPORTED"`, Received `"INVALID_MESSAGE"`.
3. **Answered while streaming.**
   - A `list_conversations` sent mid-stream must be answered before that turn's `stream_end`.
   - Failure: `toContain('conversation_list')`, Received `["connected","entry_upsert","entry_upsert","entry_delta","error"]`.

- **Spec:** I added a § 4.3 `list_conversations` to `specs/hal-engine-websocket-protocol/spec.md`. It has three statements, each linked to one of these tests, and `scripts/check-spec-anchor-names.mjs --fix` repointed the line numbers.
- **Test harness:** the tests pass `history` to `createServer` as an option that does not exist yet, and they spread it from a variable so the file compiles today. `RecordingStore` is a subclass of the real in-memory store that records the `listFor` arguments. It is not a mock.
- **Left to the build rounds:** the validation edge cases (limit 0, 201, 1.5, `'10'`, bad `before`) and the rejecting-store logging. I listed both under out of scope in `.lore/dod.md`.
- **Jest log noise:** a "Cannot log after tests are done" message appears in the run output, from the server's disconnect logging after teardown. It is harmless but noisy.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}