## State: red acceptance tests committed and pushed — verified this session

The branch `loop-bench/144` carries the ticket's deliverable as commit `81b650a`, and I re-verified every contract requirement against it rather than assuming it:

**What the commit holds**
- `src/conversationList.acceptance.test.ts` — 8 acceptance tests in their own `.acceptance.test.ts` file, driving real engines (`createHalEngine`, the deployer's config path) and real stores over real sockets, reading every answer off the wire
- `.lore/dod.md` — the ticket's central claim quoted verbatim, strategy `direct` (the seam exists: `createServer` already holds the store and threads `resume` through its options), 8 test boxes, 9 facets for the implementing round
- `specs/hal-engine-websocket-protocol/spec.md` — §4.3 `list_conversations`, §5.9 `conversation_list`, the `UNSUPPORTED` row of §5.6, the authorisation rule and the GDPR note, each statement carrying `([validated by: ...](...#Lnn))` citations that anchor to the test's current lines

**The red bar, run by me this session** — `node --experimental-vm-modules node_modules/jest/bin/jest.js src/conversationList.acceptance.test.ts`:

```
Test Suites: 1 failed, 1 total
Tests:       8 failed, 8 total
```

Every test fails for the ticket's stated reason — the frame is answered `INVALID_MESSAGE` because nothing handles it, not for an import or fixture error:

```
● delivers the connecting user's conversations as one conversation_list…
    -   "answered": 1,
    +   "answered": 0,
    -   "newestFirst": Array ["94e7d129…", "later", "earlier"],
    +   "newestFirst": Array [],
    +   "withErrors": Array ["INVALID_MESSAGE"],

● answers UNSUPPORTED wherever it cannot answer…
    -       "UNSUPPORTED",
    +       "INVALID_MESSAGE",

● answers SERVER_ERROR when the store fails…
    -       "code": "SERVER_ERROR",
    +       "code": "INVALID_MESSAGE",
    -     "withSession": true,
    +     "withSession": false,

● rejoins a conversation by an id taken from the list…
    -   "resumed": true,
    +   "resumed": false,
```

**Other verifications**: `npx prettier --check` clean on all three changed files; `check:spec-links` (0 misplaced across 1924 statements), `spec:names` (804 citations name their tests), `check:spec-status` (0 findings) all pass; branch is 0 commits behind `origin/main` (no merge owed) and exactly at `origin/loop-bench/144` — the red bar is on the remote, where CI's Test step (jest, `testMatch: ['**/*.test.ts']` over `src/`) will show it on the PR.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}