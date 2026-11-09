Done. The DoD for #144 is now six executable acceptance tests, all red, all failing on the absent behaviour.

**Triage: `direct`** — the seam already exists: `createServer` upgrades real WebSocket connections, and #146 shipped `InMemorySessionStore.listFor`, so each test drives a real client against a real engine and fails today because every `list_conversations` frame is answered `INVALID_MESSAGE` as an unknown type.

**What landed** (commit `717193f`, pushed; branch up to date with `origin/main`, which had no drift):
- `src/transport/ws/conversationList.acceptance.test.ts` — new file, six end-to-end suites, one `expect` each per the repo's `max-expects` rule: the list + paging + ISO wire rows, the authorisation rule (recorded `listFor` argument), the three refusal paths (`UNSUPPORTED` ×2, safe `SERVER_ERROR` + socket open + log), the off-the-lock ordering, static validation (field-naming, on and off), and the row→`?sessionId=`→resume loop.
- `.lore/dod.md` — the ticket's claim quoted verbatim, strategy, the six tests, the round's facets (types, `StoreCannotList`, config threading, docs/CHANGELOG/version bump, `npm run verify`), out of scope.
- Both named specs gained the statements these tests validate, with `([validated by: ...](...#Lnn))` citations — `npm run spec:names`, `npm run check:spec-links`, `npm run check:spec-status` and `node scripts/repoint-spec-anchors.mjs --check origin/main` all pass (801 citations verified, 0 stale).

**The red bar** — command run: `NODE_OPTIONS="--experimental-vm-modules" npx jest --runTestsByPath src/transport/ws/conversationList.acceptance.test.ts` → `Tests: 6 failed, 6 total`. Actual failures:

```
● … answers list_conversations with the list of the user on the connection, newest first, and pages it with limit and before
    no a conversation_list frame arrived within 2000ms; the socket received: connected, error

● … answers a frame naming another user with the list of the user on the connection, and asks the store for that user
    no a conversation_list frame arrived within 2000ms; the socket received: connected, error

● … answers a history that is off, a store that cannot list, and a store that fails with one error frame and never an empty list
    -     "code": "UNSUPPORTED",        +     "code": "INVALID_MESSAGE",
    -   "failedCode": "SERVER_ERROR",   +   "failedCode": "INVALID_MESSAGE",
    -   "loggedWithSessionId": true,    +   "loggedWithSessionId": false,

● … answers list_conversations while a turn on the same session is still streaming, before that turn ends
    no a conversation_list frame while the turn is still streaming arrived within 2000ms; the socket received: connected, entry_upsert, entry_upsert, entry_delta, error

● … validates the frame whether or not history is on, refusing a bad limit or before with the field named
    -       "named": true,   +       "named": false     (×7, code INVALID_MESSAGE "Unknown message type: list_conversations")

● … rejoins a conversation by an id taken from a list row, through the existing resume path
    no a conversation_list frame arrived within 2000ms; the socket received: connected, entry_upsert, …, stream_end, error
```

Each failure is the ticket's own claim — a client asking for its history gets no list. One finding for the record: the amended cursor (`{updatedAt, sessionId}`) means the validator must refuse a half cursor; that is pinned in the validation test and stated in the spec's §4.3.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}