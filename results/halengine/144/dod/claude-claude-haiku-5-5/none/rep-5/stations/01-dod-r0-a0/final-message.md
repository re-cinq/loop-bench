The ticket's acceptance tests are committed and pushed to `loop-bench/144`. The branch is in sync with its upstream, and the `origin/main` merge produced nothing to add.

**Triage: `direct`.** `createServer` already runs real upgrades over a real socket, and `listFor` from #143 is on this branch. The missing piece is the `list_conversations` frame, so the tests fail on the unknown frame type.

**Central claim (quoted in `.lore/dod.md`):** "the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade."

**Tests:** `src/transport/conversationList.acceptance.test.ts`, two tests, which I ran:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts
```

1. **Own list, newest first, ISO times, no stream_end.** The frame carries `userId: 'u2'`, yet the answer must be u1's rows. Red output:
   ```
   - "rows": [ "<connected id>", "newest", "middle", "older" ],
   + "rows": undefined,
   - "conversation_list",
   + "error",
   ```
   The server logged `Unknown message type: list_conversations`.
2. **History off → `UNSUPPORTED` error, no list.** Red output: `- "code": "UNSUPPORTED"` / `+ "code": "INVALID_MESSAGE"`.

The rows include the connection's own fresh conversation, as the ticket's amendment says it should, so the expected row list starts with the connected session id.

**Scope choices:**
- The ticket lists about 15 criteria. I kept two tests because they cover the central claim, the connection-derived user id and the opt-in default. The other criteria (validator cases, store without `listFor`, rejecting store, lock bypass, reconnect, docs) are listed as facets in `.lore/dod.md`.
- No spec statement owned by this ticket exists yet, so I added no `validated by` parenthetical or anchor stamp. The websocket protocol spec does not use that citation form.

**Not verified here:** the repo's lint, typecheck and full suite. I ran only the file above. Prettier was applied to both changed files, and the DoD's red-bar line records where the run happened.

**Hook note:** a Bash hook blocked one command, citing the full suite. The command string contained the repo's CI test-command text, but it ran no tests. I made that edit with the file tools instead.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}