Done. The branch `loop-bench/144` is pushed and up to date with its base.

## What I did

**Triage: `direct`** — the seam already exists. `createServer` holds the session store and orchestrator and threads `resume`; `wsTestSupport` can put a real client on a real socket over a real store. The tests call that entry point (and, for the headline, `createHalEngine`, the deployer's own config path) and fail today on behaviour.

**Delivered:**
- `.lore/dod.md` — the ticket's central claim quoted verbatim, the strategy, 8 named tests, facets (types/validation/`ErrorCodes`/handler/`createServer`/config threading, specs, docs, changelog, MINOR bump), out of scope.
- `src/conversationList.acceptance.test.ts` — 8 acceptance tests over real engines, real stores and real sockets, one file, one `expect` each (the repo's `max-expects` rule), no doubles: the recording store subclasses the real `InMemorySessionStore` to record the `listFor` argument; the failing store is the real store in a database failure mode.
- `specs/hal-engine-websocket-protocol/spec.md` — §4.3 `list_conversations`, §5.9 `conversation_list`, the `UNSUPPORTED` row of §5.6, every statement carrying a `([validated by: …])` citation. `npm run spec:names`, `check:spec-links`, `check:spec-status` all pass; `Status` untouched.

Two things the ticket adds don't exist yet, so the test file declares them locally rather than failing to compile: `history` is typed on the variables it is passed in (it lands on `HalServerOptions`/`HalEngineConfig` with the round), and `StoreCannotList` is read off the package surface at runtime — that scenario's red bar names the missing export until it lands.

## Red bar (command: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/conversationList.acceptance.test.ts`)

`Tests: 8 failed, 8 total` — every one for the ticket's stated reason, the frame answered by nothing:

```
● › delivers the connecting user's conversations as one conversation_list, newest first, …
    -   "answered": 1,
    +   "answered": 0,
    -   "withErrors": Array [],
    +   "withErrors": Array ["INVALID_MESSAGE"],

● › answers UNSUPPORTED wherever it cannot answer, and never with a list or an empty one
    -       "UNSUPPORTED",
    +       "INVALID_MESSAGE",

● › answers SERVER_ERROR when the store fails, without carrying its detail, …
    -       "code": "SERVER_ERROR",
    +       "code": "INVALID_MESSAGE",
    -     "withSession": true,
    +     "withSession": false,

● › refuses a frame whose window is malformed, naming the field
    -     "names": "limit",
    +     "names": undefined,     // today: "Unknown message type: list_conversations"

● › rejoins a conversation by an id taken from the list, through the resume path resume enables
    -   "resumed": true,
    +   "resumed": false,          // no conversation_list arrived to take an id from
```

**Finding on the way (not a test subject):** `fiveMemberStore` in `sessionStoreTestSupport.ts` is a module-level shared object — safe for these tests, but a round adding a second mutating user of it should watch for cross-test bleed.

LORE_NODE_RESULT: `{"outcome":"success","extras":{"dod_strategy":"direct"}}`