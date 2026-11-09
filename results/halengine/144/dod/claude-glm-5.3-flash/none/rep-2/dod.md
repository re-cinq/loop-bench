# Definition of Done

> "It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade."

**Strategy: `direct`** — the seams exist today: `validateMessage` is the real validator entry point, and `wsTestSupport.startEngineWith` upgrades a real socket against a real server, so a `list_conversations` frame can be sent to both right now. Each red test fails on behaviour that is absent (the frame is answered `INVALID_MESSAGE` as an unknown type, no `conversation_list` is ever sent), not on a missing import or fixture. No production code was written by this round; the tests are the contract.

## Done when these pass

- [ ] **validates a list_conversations frame by its fields alone, naming the field it refuses** — `validateMessage` accepts a bare frame and one with `limit`/`before`, forwards no other field (a frame-carried `userId` included), bounds `limit` at integers 1–200, takes `before` as the two-part ISO cursor and refuses one half alone, and names the offending field; `ping` and `user_message` still validate
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers exactly one conversation_list, newest first, with ISO times and no stream_end** — with `history: {enabled: true}` and a real seeded store, one frame carries the summaries newest activity first, each row exactly `sessionId`/`createdAt`/`updatedAt`/`entryCount` with both times as ISO strings, the connection's own conversation listed like any other, and no `stream_end`
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists the conversations of the user the socket authenticated, with the arguments the frame sent** — the store's `listFor` is called with `ws.userId` (asserted on the recorded argument) even when the frame carries another user's `userId`, the answer is only that user's rows, and `limit`/`before` arrive as the frame sent them
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list it cannot give with UNSUPPORTED, never an empty one** — with `history` absent, and with it on against a store implementing no `listFor`, the answer is one `error` frame coded `UNSUPPORTED` and no `conversation_list`
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a failing store with SERVER_ERROR and stays open, and one that cannot list with UNSUPPORTED** — a rejecting `listFor` yields one `SERVER_ERROR` frame carrying no store detail with the socket still answering; a store throwing the new public `StoreCannotList` yields `UNSUPPORTED`
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a history request beside a streaming turn, before it ends** — a `list_conversations` sent while a `user_message` streams on the same session is answered before that turn's `stream_end`, not queued behind the lock
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **hands a client a conversation it can reopen by reconnecting with its id** — an id taken from a `conversation_list` row, reopened with `?sessionId=<id>`, answers `resumed: true` with that conversation's replay, through the existing resume path
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- `src/types/messages.ts`, additive only: four new interfaces (`ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor`, `ConversationSummary`) and their two union members; `git diff` of the file touches no existing line, and every message literal valid before the change still compiles (a compile fixture beside the existing type tests is the cleanest pin)
- `src/transport/ws/validation.ts`: the `list_conversations` case, per the first test above
- `src/transport/ws/messageHandler.ts` and `src/transport/createServer.ts`: the session store and `history` threaded through `HalServerOptions` beside `resume`; the answer handled on the non-locked path beside `ping`, with the user id taken from `ws.userId`
- `src/types/session.ts`: `ErrorCodes.UNSUPPORTED`; `StoreCannotList` defined beside the store port and re-exported from `src/index.ts`
- Failure logging: the `SERVER_ERROR` path logs with the session id and no user content — pin the log line in a unit test beside the handler (the acceptance test pins the wire, not the log)
- `src/config.ts`: `transport.history` threaded through like `transport.resume`; the engine warns at startup when `history` is on without `resume` (the row a list hands back cannot otherwise be opened)
- Spec bookkeeping once green: the `Status` rows of both touched specs move per AGENTS.md (they were not edited here); the statements and their citations are already in place
- Docs a client installs from: `docs/getting-started.md` § Conversation list made in `example/full-config.ts` and regenerated with `npm run docs:fix` (a hand-edited doc block fails `npm run docs:check`); `CHANGELOG.md` entry under `## [Unreleased]`; MINOR version bump with the PR body saying so

## Out of scope

- A preview or title on the summaries (its own issue); deleting a conversation from the client; paging state held server-side; an operator view of another user's conversations; live sync between open tabs (re-cinq/HALEngine#124)
- The PR body and release notes beyond the changelog entry
- Any change to `ConnectedMessage`, the resume path's behaviour, or the store-side `listFor` contract (specs/hal-engine-conversation-list/spec.md, already shipped)