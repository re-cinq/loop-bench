The acceptance tests for #144 were already written and pushed on this branch by an earlier round. I checked them against the ticket and they hold up. I made no changes this round.

**State of the branch**
- Commit `1025e3b test(transport): pin list_conversations acceptance tests` adds `src/transport/conversationList.acceptance.test.ts` and `.lore/dod.md`.
- The branch is up to date with `origin/loop-bench/144`, and `origin/main` has no commits it lacks, so there is nothing to merge.
- The prerequisite #143 (`listFor`) is on `origin/main` as #146, so the seam exists.

**Strategy: `direct`.** `createServer` over a real WebSocket upgrade, with the real `InMemorySessionStore`, is the entry point. `list_conversations` is absent from `validateMessage`, so the socket answers with an error today.

**Red bar.** I ran the file here with Jest:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts
```

Output, trimmed:

```
FAIL src/transport/conversationList.acceptance.test.ts
  ● ... › lists the connecting user, never the user named in the frame
    -   "errors": Array [],   "sessionIds": Array [ "mine" ],
    +   "errors": Array [ { "code": "INVALID_MESSAGE",
    +       "message": "Unknown message type: list_conversations", "type": "error" } ],
    +   "sessionIds": Array [],
  ● ... › is answered with its user conversations, newest first, with ISO times and no stream_end
    -   "answers": 1,  "rows": [ newest, middle, older ],
    +   "answers": 0,  "rows": [],
Tests: 2 failed, 2 total
```

Both fail on the absent handler, which is the ticket's claim. The first test's output does not print the error text. Its helper resolves on the first `error` frame, so the empty answer comes from that same error. I read that from the code rather than from its output.

**Where the dod overstates.** `.lore/dod.md` says both tests fail with `Unknown message type`. The first test's printed diff does not show that text, though the mechanism above makes it true. I did not edit the file this round.

**Gaps I did not fill**
- The contract asks each acceptance test to cite a spec statement. The ticket's transport statements are not yet in `specs/hal-engine-websocket-protocol/spec.md`, and the conversation-list spec covers only the store. So there is no un-linked statement to cite yet. Adding those statements is implementation work the ticket describes.
- The ticket's other criteria (`history` off, `UNSUPPORTED`, `SERVER_ERROR`, the streaming lock, reconnect via `?sessionId=`) have no tests yet. The dod defers them to later rounds on purpose.

I did not run the lint, typecheck or formatter, per the pod rules. CI runs the tests in the `Verify` job, step `Test (with coverage floor)` (`npm run test:coverage`).

The red bar was already committed and pushed in `1025e3b`, so there is nothing new to push this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}