The acceptance tests for #144 were already committed on this branch by an earlier round. I verified them, corrected one line of the DoD, and pushed. The branch is level with `origin/loop-bench/144`, and `origin/main` is already an ancestor, so no merge was needed.

**Strategy: `direct`.** `createServer` with a real WebSocket upgrade is the seam, and `InMemorySessionStore.listFor` already exists from #146. Nothing answers `list_conversations` on the socket yet.

**Tests** (`src/transport/ws/conversationList.acceptance.test.ts`, two tests, both pinning the central claim):
- Answers the connection's user's conversations newest first, with ISO-string times and no `stream_end`.
- Answers with the connecting user's own list even when the frame names another user (`userId: 'u2'`).

**Red bar, run here:**
```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/ws/conversationList.acceptance.test.ts
```
```
FAIL src/transport/ws/conversationList.acceptance.test.ts
  ● ... answers the connection's user's conversations newest first ...
    - "code": undefined,   + "code": "INVALID_MESSAGE",
    - "order": [ "u1-newest", "u1-middle", "u1-oldest" ],   + "order": [],
    - "type": "conversation_list",   + "type": "error",
  ● ... answers with the connecting user's own list even when the frame names another user ...
    - "order": [ "u1-only" ],   + "order": [],
    - "type": "conversation_list",   + "type": "error",
Tests: 2 failed, 2 total
```
Both fail because `list_conversations` is an unknown message type, which is the behaviour the ticket asks to add, so the failure is for the right reason.

**This pod's change:** `.lore/dod.md` named the wrong CI job. It said `hal-engine-jest`, which is a Lore test-command id, not a CI job. The suite actually runs in the `Verify` job of `.github/workflows/ci.yml`, step "Test (with coverage floor)", as `npm run test:coverage`. I corrected that line and pushed it as `af53137`.

**Not covered by these two tests:** the ticket's other criteria (opt-in `UNSUPPORTED`, store without `listFor`, store failure, lock bypass, resume round trip, spec and CHANGELOG edits) are listed as facets in `.lore/dod.md`, not as acceptance tests in this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}