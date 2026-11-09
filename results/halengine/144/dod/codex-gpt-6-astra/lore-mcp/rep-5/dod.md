# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createHalEngine`, real WebSocket upgrades and `validateMessage` already expose the required boundary. Tests use the real in-memory store, a recording decorator that executes its query, and real Mongo adapters for unavailable or failed listing; a consumer policy hook holds a real user turn open without a model request.

## Done when these pass

- [ ] **validates history frames and composite cursors without changing existing message literals** — Static validation, amended composite cursors, bounds and additive compatibility.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated user, pages tied activity and resumes a listed conversation** — Config reaches the real server, ownership reaches the recorded query, metadata is serialised, paging preserves ties, the current conversation is included, and a listed row opens through resume.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses disabled or unavailable history and contains real store failures without closing the socket** — Independent opt-in, UNSUPPORTED versus SERVER_ERROR, exported StoreCannotList, sanitisation, session-scoped logging, usable sockets, and the history-without-resume warning.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history before an active user turn ends without taking the session lock** — A pending streaming orchestration call does not block history or add a terminal frame to it.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and union members without changing existing message semantics or ConnectedMessage; accept the amended composite cursor with field-specific validation errors.
- [ ] Thread independent `transport.history` options through the factory and server; document the retention responsibility beside the options and warn when resume is disabled.
- [ ] Answer off the turn lock using `ws.userId` and the unchanged paging options, serialising only summary metadata; preserve the existing resume/replay path.
- [ ] Export StoreCannotList and classify unsupported versus failed listing; sanitise client errors and log the session id without user content.
- [ ] Finish the installer-facing Unreleased changelog and MINOR version bump; add Conversation list guidance via `example/full-config.ts` and regenerate with `npm run docs:fix`, including the separate resume setting.
- [ ] Keep the spec citations aligned with the tests, and let CI run build, coverage and the repository gates; do not change a spec Status to claim implementation in this red-test commit.

## Out of scope

- Titles, previews, deletion, server-held paging state, operator access, cross-tab live sync and a new in-band resume path.
- Store ordering and retention changes already covered by #143; the new tests exercise those real stores through the transport.
- New assertions scanning production source or documentation text; additive API review, generated documentation and release bookkeeping remain the explicit facets above.