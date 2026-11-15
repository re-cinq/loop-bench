The acceptance tests are committed and pushed to `loop-bench/144` as `237b715`. All three are red, and they fail because the frame is not understood, not because of a broken import or fixture.

**Strategy: `direct`.** `createServer` already takes `sessionStore` and `resume`, and `SessionStore.listFor` already ships on `InMemorySessionStore` (#146). The tests open a real WebSocket, so the only missing pieces are the `list_conversations` frame and the `transport.history` option.

**Files**
- `src/transport/ws/conversationList.acceptance.test.ts` (new, 3 tests)
- `.lore/dod.md` (new): quotes the ticket's central claim, names the strategy, lists the three tests, and gives the remaining criteria as facets.

**Tests**
1. Answers `list_conversations` with the user's conversations, newest first, ISO-string summaries with exactly four fields, in one `conversation_list` with no `stream_end`.
2. A frame carrying `userId: 'u2'` on a `u1` connection gets `u1`'s list and none of `u2`'s.
3. With history off, the frame gets one `error` coded `UNSUPPORTED` and no list.

**Red output** (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/ws/conversationList.acceptance.test.ts`, the repo's `npm test` flags):
- Test 1: `types` received `["error","pong"]`, expected `["conversation_list","pong"]`.
- Test 2: `types` received `["error","pong"]`, expected `["conversation_list","pong"]`.
- Test 3: `code` received `"INVALID_MESSAGE"`, expected `"UNSUPPORTED"`.

The server rejects the frame as an unknown message type, which is the absent behaviour the ticket describes.

**Choices and deviations**
- Jest must run with `--experimental-vm-modules`; a bare `jest` run fails with an ESM error. I used that form, and CI's `npm test` already passes it.
- The `history` option is passed through a spread, not a literal, so the red bar is a runtime failure. An object literal would fail to compile instead, which would be a type error rather than a missing behaviour.
- The connection resumes into one of the seeded conversations, so the connection adds no row of its own. Resumed replay frames (`entry_*`) are skipped in the helper; they are not part of any answer under test.
- No spec statements carry `([validated by ...])` citations yet, because the ticket's new spec statements do not exist. The build round adds them with the spec edits.
- I did not edit `| Status |` on any spec.
- The other acceptance criteria (validation, the store without `listFor`, store failure, the streaming-lock bypass, reconnect, spec, changelog, docs) are not pinned by these three tests. They are listed as facets in `.lore/dod.md`.
- The ticket asks for more than the smallest set that pins its central claim. A later round should add those tests as it closes each facet.

**Delivery:** formatted with prettier, committed, and pushed. `origin/main` had no commits this branch lacked, so no merge was needed. `git status` reports the branch is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}