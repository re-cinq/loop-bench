I committed and pushed four acceptance tests for #144 in `src/transport/conversationList.acceptance.test.ts`, and all four fail today. The branch is up to date with `origin/main` and not ahead of its upstream. I ran only this file, with `NODE_OPTIONS=--experimental-vm-modules npx jest <file>`. The strategy is `direct`.

The tests start a real engine on a real socket, apart from the "rejects" test, which calls `validateMessage` directly. The store is the shipped `InMemorySessionStore`, subclassed to record the `listFor` arguments. The "cannot list" store is a wrapper with only the original five members.

Each test fails because `list_conversations` is an unknown frame. That matches the ticket's claim that a client cannot get its conversation list over the socket.

1. **Validation:** a bare `list_conversations` frame is rejected as `INVALID_MESSAGE`. Received `plain: false`, and all five out-of-range variants have `named: [false ×5]`.
2. **Own list, whatever `userId` the frame carries:** no `conversation_list` is sent and `listFor` is never called. Received `lists: 0`, `askedFor: []`, `seededOrder: []`.
3. **`UNSUPPORTED`:** both the history-off case and the no-`listFor` store get `INVALID_MESSAGE` instead of `UNSUPPORTED`. Expected `["UNSUPPORTED"]`, received `["INVALID_MESSAGE"]`.
4. **Not blocked behind a streaming turn:** the frames seen are `["connected","error","entry_upsert"]`, so no `conversation_list` arrives.

Not pinned in these tests, and listed as owed in `.lore/dod.md`:
- The rejecting-`listFor` case (`SERVER_ERROR` with no store detail, logged with the session id) and the `StoreCannotList` case.
- Reconnecting with `?sessionId=<id>` from a listed row.
- `ConnectedMessage` unchanged.
- The spec, GDPR, CHANGELOG, docs and version criteria.

I added no `([validated by …])` citations to the protocol spec. Its statements for the new frames don't exist yet, and I can't write them without editing the spec itself. I also found no spec-anchor stamping convention in the repo to follow.

`ts-jest` type-checks, so the tests pass `history` through a spread object. This keeps the failure about behaviour rather than a type error.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}