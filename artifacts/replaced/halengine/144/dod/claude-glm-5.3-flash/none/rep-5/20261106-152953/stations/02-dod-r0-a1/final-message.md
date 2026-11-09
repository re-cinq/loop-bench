Done. The branch already carried this ticket's acceptance-test round (`ffec763`); I verified it against the ticket end to end and closed one gap rather than rewriting it.

**What I found and did**

- `ffec763` adds `src/transport/conversationList.acceptance.test.ts` (16 assertions, one new file, `.acceptance.test.ts` suffix) and `.lore/dod.md` in the required shape — verbatim claim quote, `direct` strategy, checkboxes, facets, out-of-scope. Production code has none of the feature: no `list_conversations`, `conversation_list`, `history` or `StoreCannotList` anywhere in `src/`, so the red bar is real.
- One DoD statement was untrue: it claimed the first test pins the `connected` frame's fields unchanged, but the test only read its `sessionId`. That criterion is in the ticket verbatim, so I added the honest wire assertion — a fresh `connected` must carry exactly `examplePrompts, message, sessionId, type` — making the claim true (`a8a7c4a`, pushed). Prettier run over the file.
- `git status`: branch up to date with `origin/loop-bench/144`, working tree clean. `origin/main` is 0 commits ahead, so no merge was owed.

**Run command and actual failure output**

```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts
```

```
Tests:       16 failed, 16 total

● a list_conversations frame › answers with the conversations of the user the connection authenticated, newest first, as ISO strings
    no conversation_list frame arrived; the frames seen were: connected, error

● the frame shape › accepts a bare list_conversations and forwards no user id, whether history is on or not
    - Expected  - 4
    + Received  + 2
      Object {
    -   "data": Object { "type": "list_conversations", },
    -   "valid": true,
    +   "error": "Unknown message type: list_conversations",
    +   "valid": false,

● when the frame cannot be answered › answers UNSUPPORTED and no list when history is off or the store cannot list, and warns when history is on without resume
    Expected: "UNSUPPORTED"   Received: "INVALID_MESSAGE"

● beside a streaming turn › answers a list request while the turn is still streaming, before its stream_end
    no conversation_list frame arrived; the frames seen were: connected, entry_upsert, entry_upsert, entry_delta, error
```

Every failure is the ticket's stated reason — the client cannot reach the conversation list over the socket; the engine answers `INVALID_MESSAGE` because nothing answers the frame. The new `connected`-shape pin passes today (regression guard on a frame that already ships) while the missing list behaviour keeps all 16 tests red.

One finding for the implementing round, not a test subject: the ticket's "grep shows no code path that sends `conversations: []`" and the `messages.ts` additive-diff checks are reviewer checks the tests cannot carry; `.lore/dod.md` says so explicitly under Out of scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}