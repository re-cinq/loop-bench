Everything is committed and pushed; the branch is up to date with its upstream and its base. Final verification state:

**What I did**

- Read the ticket and the two specs it names. The conversation-list spec (#143, `listFor`) is already Shipped; nothing on the transport offers a list to a *client* — `validateMessage` has no `list_conversations` case and `createMessageHandler` takes only the orchestrator. That made the triage **`direct`**: the seams exist (`validateMessage`, real WebSocket upgrades through `createServer`, a seedable `InMemorySessionStore`), so every test drives the real entry point and fails on behaviour.
- New acceptance file `src/transport/conversationList.acceptance.test.ts` — six tests, one `expect` each, real sockets, no doubles:
  1. **validation** — accepts `list_conversations` statically (extra `userId` ignored), refuses `limit` 0/201/1.5/'10', an unusable `before`, an epoch `before`, and half a cursor, each naming the field
  2. **the history story** — answered off a parked turn before its `stream_end`, newest first, ISO times, metadata-only rows including the connection's own (0 entries), `listFor` called with `ws.userId` despite `userId: 'mallory'` on the frame, and a row reopened via `?sessionId=` → `resumed: true` + replay
  3. **paging passthrough** — `limit: 2` and the `{updatedAt, sessionId}` ISO cursor reach `listFor` verbatim and page; `ConnectedMessage` keeps its exact key set; startup warn when history is on without resume
  4. **UNSUPPORTED, never an empty list** — history absent, and history on with a store implementing no `listFor`, both answered `error UNSUPPORTED` for a user who demonstrably has conversations
  5. **failing store** — one `SERVER_ERROR`, no store detail in the frame, socket still answering, log carries the session id and no user content
  6. **`StoreCannotList`** — answered `UNSUPPORTED`, not a server error
- Wrote the spec statements these tests validate (§4.3, §5.9, §5.1 note, §12 GDPR bullets, `UNSUPPORTED` code row in `specs/hal-engine-websocket-protocol/spec.md`; § Over the transport in the conversation-list spec), each with a trailing `([validated by: …])` citation. `spec:names` (814 citations ok), `check:spec-links` (0 misplaced) and `check:spec-status` (0 findings) all pass.
- Recorded the triage in `.lore/dod.md` and committed everything (`bf5fcc3`), pushed; `origin/main` already merged clean.

**The red bar** — command: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts` (CI runs it in job **CI / Verify**, step *Test (with coverage floor)*). Result: `Tests: 6 failed, 6 total`, each for the ticket's stated reason:

```
-   "bare": "valid",
+   "bare": "invalid: other",          # Unknown message type: list_conversations — all 13 verdicts
```
```
"entry_delta",
-     "conversation_list",
+     "error",                          # INVALID_MESSAGE today; listCalls: [], rows: [], resumed: false
```
```
-   "ids": ["seed-b", "seed-c"],        # and listCalls: [], warnedAboutHistoryWithoutResume: false
+   "ids": [],
```
```
-   "disabledCode": "UNSUPPORTED",
+   "disabledCode": "INVALID_MESSAGE",  # same for unlistedCode — no UNSUPPORTED code exists
```
```
-   "code": "SERVER_ERROR",             # and sessionIdLogged: false — nothing was asked of the store
+   "code": "INVALID_MESSAGE",
```
```
sessionStore does not export StoreCannotList yet: the transport cannot tell a store that cannot list from one that failed
```

One finding for the record: the criterion "a store holding three conversations … answered with … three summaries" reads against the ticket's own later amendment — the connection's own conversation is listed like any other, so a fresh connect over three seeded conversations answers four rows (its own holding no entries). I pinned the amended behaviour, seeding the third user's data so the frame-carried `userId` has something to be wrongly answered with.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}