The branch already had a Definition of Done and eight acceptance tests from an earlier round. I folded them into five, since the contract caps the set at five. Each of the five still fails because the feature is missing. The commit is pushed, `origin/main` was already merged in, and `git status` shows the branch level with its upstream.

**Strategy: `direct`.** `createServer` over a real socket (through `startEngineWith`) and `validateMessage` are the entry points the tests call. Today the server rejects the new frame as `Unknown message type: list_conversations`.

**What changed:**
- **Merged in pairs:** the paging test went into the main list test, the two refusal tests became one, and the two validator tests became one. Nothing they check was dropped.
- **Citations:** the eight spec lines in `specs/hal-engine-websocket-protocol/spec.md` now point at the five merged test names and their new line numbers. `check-spec-links` and `check-spec-anchor-names` both pass.
- **`.lore/dod.md`:** updated to list the five tests.
- **Spec anchor:** this repo's test listing has no field for one, so nothing was stamped.

**Red bar** (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`):
```
Tests:       5 failed, 5 total
● …answers list_conversations with exactly one conversation_list … even when the frame names another user
    -   "answer": "conversation_list",   +   "answer": "error",
    +   "askedFor": Array [],            +   "lists": 0,
● …answers UNSUPPORTED with history absent, with no listFor, … SERVER_ERROR …
    -     "code": "UNSUPPORTED",         +     "code": "INVALID_MESSAGE",
    -     "code": "SERVER_ERROR",        +     "code": "INVALID_MESSAGE",
    -   "loggedWithSessionId": true,     +   "loggedWithSessionId": false,
● …answers list_conversations while a user_message is still streaming, before that turn's stream_end
    -   "answer": "conversation_list",   +   "answer": "error",
● …resumes a conversation picked from the list when the client reconnects with its id
    -     "resumed": true, "sessionId": "b"   +     "resumed": false, "sessionId": "2188d511-…"
● validating a list_conversations frame › accepts one with no fields, … refuses any other limit or before naming the field
```
The server log shows the cause in every case: `validation failed … "Unknown message type: list_conversations"`. The ticket's claim is that a client has no way to get its conversation list over the socket, and that is exactly what these failures show.

**Not covered by a runtime test, as listed under Out of scope in `.lore/dod.md`:** the type-only criteria (`messages.ts` only adds new types, `ConnectedMessage` is unchanged). CI's build and review check those. The changelog, docs regeneration and version bump are listed as steps still to do.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}