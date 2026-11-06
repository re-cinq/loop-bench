An earlier round had already written and pushed the definition of done and the acceptance tests for #144, in commit `f0cf484`. I ran them again and they are still red for the ticket's reason, so I changed nothing.

**Strategy: `direct`.** The tests go through the real entry points: `validateMessage` (the message validator) and `createServer` over a real socket, using a real `InMemorySessionStore` wrapped to record what `listFor` is asked. There are no mocks. The five tests are in `src/transport/conversationList.acceptance.test.ts`, and `.lore/dod.md` lists them with the facets still owed.

**Red bar.** Command: `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/transport/conversationList.acceptance.test.ts --coverage=false`

```
Tests:       5 failed, 5 total
```

Every failure comes from the same gap: the engine does not know `list_conversations` yet.

- **Validation:** every case comes back `"bare": "Unknown message type: list_conversations"` where `'valid'` or a message naming `limit`/`before` is expected.
- **Own user's list, paging:** no `conversation_list` frame is sent, and `listFor` is never called. The test expected two calls with `"u1"` and `{limit, before}`.
- **Refusals:** each case gets `"INVALID_MESSAGE"` where `"UNSUPPORTED"` or `"SERVER_ERROR"` is expected, and `"loggedForSession": false` where it should be `true`.
- **Not waiting on the lock:** the order is `["error", "stream_end"]` where `["conversation_list", "stream_end"]` is expected.
- **Reopening a listed conversation:** `"picked": undefined` and `"resumed": false`, because no list ever came back to pick from.

**Checks:**
- The feature is not on `origin/main`, so the ticket is not already resolved.
- `origin/main` is already merged into the branch, so there was nothing to merge.
- `git status` shows `loop-bench/144...origin/loop-bench/144`, so nothing is left unpushed.
- The `([validated by: ...](...#Lnn))` links added to `specs/hal-engine-websocket-protocol/spec.md` point at lines 112, 140, 187, 221 and 257, which are where the five tests start.

Some acceptance criteria are left to review rather than tests, as `.lore/dod.md` says: the compile fixture for existing message literals, `ConnectedMessage` staying unchanged, the GDPR retention note, the CHANGELOG entry, the docs regenerated from `example/full-config.ts`, and the MINOR version bump.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}