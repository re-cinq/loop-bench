The acceptance tests and DoD for #144 were already committed and pushed on this branch by an earlier round (`d3b8496`). I verified them in place and made no changes this round.

**Strategy: `direct`.** `createServer` on a real upgrade over a real socket is the seam, and `InMemorySessionStore.listFor` already exists from #146. Nothing answers `list_conversations` yet, so the frame is refused today.

**Red bar** (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/listConversations.acceptance.test.ts`):

```
● list_conversations over the WebSocket › answers the connecting user's conversations as one conversation_list, newest first, with ISO times
    Expected: ["conversation_list"]   Received: ["error"]

● list_conversations over the WebSocket › ignores a userId in the frame and lists by the connection's authenticated user
    Expected: ["conversation_list"]   Received: ["error"]

● list_conversations over the WebSocket › answers UNSUPPORTED with no conversation_list when transport.history is absent
    Expected: "UNSUPPORTED"   Received: "INVALID_MESSAGE"

Tests: 3 failed, 3 total
```

All three fail because the frame is refused as `INVALID_MESSAGE` and no handler answers it. That is the absent behaviour the ticket claims, not a fixture or import problem.

**Things to know:**
- A bare `jest <path>` fails at module load with an ESM error. The repo's `npm test` script sets `--experimental-vm-modules`, so I ran the file with that flag. The file itself is fine.
- `.lore/dod.md` quotes the ticket's central claim, names the three tests, and lists the facets. It also says the `validateMessage` limit and cursor cases, the store-error mapping, the streaming non-lock case, and the reconnect path are facets rather than acceptance tests here. The ticket's remaining criteria (GDPR text, CHANGELOG, spec citations, `npm run verify`) are not covered by these tests.
- No spec statement for conversation lists exists yet in `specs/hal-engine-websocket-protocol/spec.md`, so there were no un-linked statements to map and I added no spec links.
- The branch is up to date with `origin/main` and its upstream, with nothing uncommitted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}