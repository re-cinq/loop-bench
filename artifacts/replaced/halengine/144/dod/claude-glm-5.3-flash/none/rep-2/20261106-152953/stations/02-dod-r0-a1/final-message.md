Done. The branch already carried this ticket's red DoD from the first pass (`00ae274`); this run verified it end to end, corrected the formatter drift in `.lore/dod.md`, and pushed (`1e8041f`).

**Triage: `direct`** — the seam exists: `createServer` authenticates the user on the upgrade and hands every inbound frame to `createMessageHandler`, so each test opens a real socket against a real engine (real `InMemorySessionStore`/`MongoSessionStore`, real upgrade, no doubles). The one piece with no server-side seam — the validator — is tested at its own real entry point, `validateMessage`.

**The contract** — `src/transport/conversationHistory.acceptance.test.ts` (new file, beside the code), 8 tests, all red:

- one `conversation_list` with the store's three summaries, newest first, ISO times, no `stream_end`
- `limit`/`before` reach `listFor` verbatim and the page answers through the real store
- a frame naming `userId: 'u2'` is answered with the socket user's own list, `listFor` asked for `u1`
- history off / store with no `listFor` → exactly one `error` coded `UNSUPPORTED`, never a list
- `MongoSessionStore` over a collection with no `find` → `UNSUPPORTED` (the `StoreCannotList` amendment)
- rejecting `listFor` → `SERVER_ERROR`, no store detail, socket stays open, session id logged, no user content in logs
- a list request mid-stream lands between `entry_delta` and `entry_commit`, before `stream_end`
- the validator accepts the frame and refuses bad `limit`/`before`, naming the field

**Failure output actually observed** (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationHistory.acceptance.test.ts`):

```
● a user conversation list over the websocket › answers a list_conversations frame with the connecting user's conversations, newest first, times as ISO strings
    timed out waiting to read the conversation_list; frames seen: ["connected","error"]

● a user conversation list over the websocket › answers UNSUPPORTED, and never a list, when the feature is off or the store cannot answer one
  -   "code": "UNSUPPORTED",
  +   "code": "INVALID_MESSAGE",

● a user conversation list over the websocket › answers SERVER_ERROR without store detail, keeps the socket open and logs the session id, when the store fails
  -   "code": "SERVER_ERROR",
  +   "code": "INVALID_MESSAGE",
  -   "loggedSessionId": true,
  +   "loggedSessionId": false,

● a user conversation list over the websocket › answers a list request while a turn is streaming, without waiting on the turn
    timed out waiting to read the list mid-turn; frames seen: ["connected","entry_upsert","entry_upsert","entry_delta","error"]

● the list_conversations frame at the validator › accepts the frame with its paging fields, and refuses a limit or before that breaks the rules, naming the field
  -   "valid": true,
  +   "error": "Unknown message type: list_conversations",
  +   "valid": false,

Tests:       8 failed, 8 total
```

Every red bar is the ticket's own claim — the client gets an `INVALID_MESSAGE` refusal where the list or the principled refusal is owed. Not run, per the pod's limits: lint, `tsc --noEmit` and any build; CI's `Test` step (`.github/workflows/ci.yml`, job `hal-engine-jest`) runs this file on every push and shows the red bar there too.

Criteria pinned without a new test (recorded in `.lore/dod.md`): criterion 1's compile-only diff, criterion 11's unchanged `ConnectedMessage`, and criterion 10's resume round trip — the latter is #45's existing path already pinned end to end by `src/transport/sessionResume.test.ts`, which stays green unedited. The spec statements these tests validate don't exist yet, so the trailing `([validated by ...])` citations are owed by the implementation round, as `dod.md`'s Facets records.

Delivered: committed and pushed to `origin/loop-bench/144` (`1e8041f`); `git status` reports the branch even with its upstream; `origin/main` (2926558) is an ancestor of HEAD, so the PR will get CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}