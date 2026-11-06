I wrote four acceptance tests for #144. All four fail today, each because the `list_conversations` feature doesn't exist yet. The branch is pushed and not ahead of its upstream. Merging `origin/main` changed nothing: the branch was already up to date.

**Strategy: `direct`.** `createServer` with a real `ws` client (via `wsTestSupport.ts`) and the `listFor` from #143 already exist. The tests are in `src/transport/conversationList.acceptance.test.ts`, and `.lore/dod.md` opens with the ticket's title as its central claim. I ran the file with the repo's `node --experimental-vm-modules` jest invocation. I did not run lint, the typechecker or the full suite.

The four tests and how each fails:

1. **Validation** — `{type:'list_conversations'}` should be valid, and limit 0 / 201 / 1.5 / `'10'` and `before: 'not a date'` should be invalid with the field named. Actual: `bare: false`, and every case reads `Unknown message type: list_conversations`.
2. **Own list only** — with `history: {enabled: true}` and a frame carrying `userId: 'u2'`, expect one `conversation_list` of three rows, newest first, with ISO times, and `listFor` called with `u1` and the frame's `limit`.
   - Actual: the frame is answered with `error`.
   - `count: 0`, `askedFor: []`, and `types` is `["error","pong"]`, not `["conversation_list","pong"]`.
3. **History off** — expect an `error` frame with code `UNSUPPORTED`. Actual code: `INVALID_MESSAGE`.
4. **Not queued behind a stream** — the list should arrive while a `user_message` is still streaming, before `stream_end`. Actual: the frames seen are `["connected","error","entry_upsert","entry_upsert","entry_delta"]`, with no `conversation_list`.

I added §4.3 `list_conversations` to `specs/hal-engine-websocket-protocol/spec.md`, with a `validated by` link to each of the four tests. This repo has no `reanchor.mjs`, so I set the `#Lnn` anchors by hand. They point at lines 62, 81, 111 and 122 of the test file. I changed no `Status` row.

Some acceptance criteria are not pinned yet and are listed under Facets in `dod.md`:
- A store with no `listFor`, and a `listFor` that rejects, are not covered.
- The `StoreCannotList` error, the `ConnectedMessage` check and the resume round-trip are not covered.
- The docs, changelog and spec-link checks are not covered.

The ticket's criteria give no `history` and `before` shapes beyond the amendments, so the tests only exercise `limit` through `listFor`. The `before` cursor is checked only for the invalid string.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}