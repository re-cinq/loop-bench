# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The existing `createHalEngine` and real WebSocket upgrade expose the complete client path; `validateMessage` exposes static validation. Tests use real memory and Mongo stores, a recording delegate that executes the real store, and the shipped mock provider through the real orchestrator; no methods are mocked or stubbed.

## Done when these pass

- [ ] **validates history limits and composite cursors independently of configuration** — Accepts the additive frame and rejects malformed paging fields with field-specific errors.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the socket owner with wire dates, pages ties, and resumes a listed conversation** — Checks exact metadata, recorded store arguments, ownership despite a forged user id, pagination, current-session inclusion, and existing replay.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses disabled history and stores without listing with UNSUPPORTED** — Separates history opt-in from resume and distinguishes inability to list from an empty history.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports real store failures safely and distinguishes a collection without find** — Uses a closed Mongo client and a real collection adapter without `find` to exercise sanitized errors and session-scoped failure logging.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history while a real turn holds the session lock before stream_end** — Uses an awaited lifecycle hook to hold a real streamed turn while the same socket requests history.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and union members, preserving existing message shapes and `ConnectedMessage`; validate composite cursors and bounded limits independently of config.
- [ ] Thread the separate default-off history option from engine config through server to handler, with the retention note pointing to #41; warn when history is enabled without resume.
- [ ] Answer lists on the non-locked path using `ws.userId`, unchanged paging options, ISO metadata only, and no unsolicited list or turn-terminal frame.
- [ ] Add `UNSUPPORTED` and exported `StoreCannotList`; distinguish disabled/missing capability from sanitized store failures and log failures without personal content.
- [ ] Keep selection on the existing resume/replay path and include the connection's current conversation in history.
- [ ] Document Conversation list through `example/full-config.ts` and `npm run docs:fix`; add the consumer changelog entry, MINOR version bump, and retention/deployment guidance; preserve spec status rows until implementation review.

## Out of scope

- Titles/previews, client-side deletion, server-held pagination state, operator access to another user's history, live tab synchronization, and new replay or switching frames.
- Unrelated uncited requirements in the general WebSocket protocol spec; #143's already-cited store implementation is retained.