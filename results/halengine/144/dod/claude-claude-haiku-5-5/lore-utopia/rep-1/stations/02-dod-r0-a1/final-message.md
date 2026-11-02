The acceptance tests for #144 were already written, committed and pushed on this branch by an earlier pass (`45c7c8e`). I checked them against the ticket and re-ran them. I made no new changes, so there is nothing new to commit.

**Current state**
- Branch `loop-bench/144` is clean and up to date with `origin/loop-bench/144`.
- `origin/main` is an ancestor of HEAD, so there is no merge to do.
- The test file and `.lore/dod.md` pass `prettier --check`.

**Strategy: `direct`.** `createServer` over a real WebSocket upgrade (`wsTestSupport.ts`) is an existing seam, and `InMemorySessionStore.listFor` already ships from #146. The socket has no `list_conversations` frame, so both tests fail on the missing behaviour.

**Done-when tests** (`src/transport/listConversations.acceptance.test.ts`, 2 tests):
1. A `list_conversations` frame gets one `conversation_list` whose ids equal `store.listFor('u1')`, with ISO-dated `createdAt`/`updatedAt`.
2. A frame carrying `userId: 'u2'` is answered with u1's conversations only.

**Red run.** Command:
```
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/transport/listConversations.acceptance.test.ts
```
Output:
```
FAIL src/transport/listConversations.acceptance.test.ts
  ● … is answered with one conversation_list of the connecting user’s conversations, as ISO-dated summaries
    - "type": "conversation_list", ids: [...]   + "type": "error"
  ● … answers with the connecting user list even when the frame names another user
    Expected: "conversation_list"
    Received: "error"
Tests: 2 failed, 2 total
```
The server log behind both failures reads `validation failed … "Unknown message type: list_conversations"`. That is the ticket's claim (no way to ask the socket for the list), not a test-setup fault.

**Caveats**
- The two tests cover the ticket's central claim only. The rest of the ticket's criteria (validation bounds, `UNSUPPORTED` when history is off or `listFor` is missing, off-lock answering, resume round-trip, GDPR spec text, CHANGELOG) are facets for later rounds, not part of this red bar.
- The websocket protocol spec has no un-linked list statements yet, so no spec anchors are stamped.
- Lore's `lore_assemble_context` call failed on a missing `query` argument. I did not need it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}