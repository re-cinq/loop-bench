The branch is pushed and in sync with both its upstream and `origin/main`. Here is where the ticket stands.

## What I did

**Triage: `direct`** — the seams exist: `validateMessage` is a pure entry point, and `createHalEngine`/`createServer` plus a real upgraded socket (the `sessionResume.test.ts` pattern) take a frame and return frames on the wire. Each test calls that real path today and fails because the behaviour is absent — a `list_conversations` frame is answered `error INVALID_MESSAGE` ("Unknown message type"), which is exactly the ticket's claim: the client has nothing.

One new file, `src/transport/conversationList.acceptance.test.ts`, five tests: the validator's frame rules; the connecting user's own list (authorisation from `ws.userId`, never the frame — asserted on a recording façade over the real in-memory store — plus newest-first, ISO times, no `stream_end`, and a row's id reopening through the existing `?sessionId=` resume path); `limit`/`before` reaching `listFor` with `before` as the two-half ISO cursor, not a `Date`; the `UNSUPPORTED`/`SERVER_ERROR` refusals with the socket kept open and no store detail on the wire or in any log; and the answer arriving while a turn still holds the `PerSessionLock`. `.lore/dod.md` records the claim, strategy, and the non-test facets owed (additive `messages.ts` diff, `ErrorCodes.UNSUPPORTED`, the exported `StoreCannotList`, spec/docs/CHANGELOG/MINOR bump).

## Red bar — actual failure output (all 5, run via `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/transport/conversationList.acceptance.test.ts`)

```
● …is valid with a limit of one to two hundred and a cursor of two ISO halves…
    Array [
  -   true, true, true, true, true
  +   false, false, false, false, false
```
```
● …answers the connection with its own conversations… even when the frame names another user
    Array [
      "connected",
  -   "conversation_list",
  +   "error",
      "pong",
    ]
```
```
● …hands limit and before to the store as the frame sent them, the cursor as ISO strings
  -   "conversation_list",
  +   "error",
```
```
● …answers a list it cannot serve with one error frame and no conversation list…
  -   "code": "UNSUPPORTED",
  +   "code": "INVALID_MESSAGE",
```
```
● …answers a list while a turn on the same session is still streaming, before that turn ends
  -   "answeredWith": "conversation_list",
  +   "answeredWith": "error",
  -   "lists": 1,  "rows": ["c1"],
  +   "lists": 0,  "rows": [],
```

Each failure is the absent behaviour itself, not a broken import or fixture. Two findings for the next round: test 4's `StoreCannotList` export check sits deliberately behind the refusal assertions, so it becomes the red bar once the codes land; and the config-level `history` option is passed as a variable (not an inline literal) so the file compiles against today's types — that comment says the cast is unneeded once `transport.history` exists.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}