I wrote six acceptance tests for #144. All six fail today, and the branch is pushed and up to date with `origin/main`.

I ran only `src/transport/conversationList.acceptance.test.ts`. I did not run lint, the typechecker or the full suite.

The ticket's central claim, quoted in `.lore/dod.md`, is "Deliver a user's conversation list over the WebSocket protocol". The strategy is `direct`: the real `createServer` and a real socket already exist, so the tests drive them as they are.

They fail for the stated reason. The engine does not know `list_conversations`, so it answers `INVALID_MESSAGE`:
- **Validator:** `validateMessage` returns `"Unknown message type: list_conversations"` for every case, instead of accepting the bare frame and naming `limit` or `before` for the bad ones.
- **List:** the test where a frame carries another user's `userId` gets `types: ["error"]` where `["conversation_list"]` is expected. The recorded `listFor` calls are `[]`, not `[['u1', {limit: 5, before: cursor}]]`.
- **Three conversations:** no `conversation_list` frame arrives, so the ordering and the count of three have nothing to check.
- **`UNSUPPORTED`:** history off, and history on with a store that has no `listFor`, both get `"INVALID_MESSAGE"` where `"UNSUPPORTED"` is expected.
- **Rejecting `listFor`:** the answer is `"INVALID_MESSAGE"` where `"SERVER_ERROR"` is expected.
- **Streaming:** a list request sent mid-turn gets `["connected","entry_upsert","error"]` back, with no `conversation_list`.

The jest summary is `Tests: 6 failed, 6 total`.

- **Spec links not added:** the ticket's spec statements don't exist yet, so there was nothing to link to. The implementing round has to write them with citations.
- **Option names:** the tests assume the `createServer` option is named `history` and takes `{enabled: boolean}`, as the ticket says. They pass it through a cast so a missing type doesn't fail the test for the wrong reason.
- **Not tested:** the resume-from-list path is already pinned by `src/transport/sessionResume.test.ts`. The `StoreCannotList` throw, the docs, the CHANGELOG and the version bump are left to the implementing round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}