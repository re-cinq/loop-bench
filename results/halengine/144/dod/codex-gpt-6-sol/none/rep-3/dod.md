# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` and `validateMessage` are existing entry points, and a real WebSocket can exercise both the transport and the store. The acceptance file uses a real in-memory store and records calls while delegating to its implementation.

## Done when these pass

- [ ] **accepts a list request and rejects invalid limits and incomplete or invalid cursors** — validates the new frame and refuses bad paging fields.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated user’s summaries in order, pages with the wire cursor, and reopens a row** — sends the list over a real socket, proves ownership and paging at the store call, and uses the existing resume path.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses a list when history is not enabled instead of reporting an empty history** — protects the opt-in boundary.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and two union members without changing existing message shapes; add `UNSUPPORTED` and the exported history option with its retention note.
- [ ] Validate `list_conversations` limits and composite cursors independently of the history option.
- [ ] Answer a list off the per-session lock using `ws.userId`, pass paging options to `listFor`, and serialize summaries with ISO times and no content.
- [ ] Return `UNSUPPORTED` when history is off or `listFor` is absent; distinguish `StoreCannotList` from transient store failures, logging the latter without exposing details.
- [ ] Keep resume as the only path for opening a listed conversation and avoid unsolicited list frames or turn-ending frames for list requests.
- [ ] Extend the protocol and conversation-list specs, regenerate getting-started documentation from `example/full-config.ts`, add an Unreleased changelog entry, and make the minor version bump.

## Out of scope

- Titles or previews, deletion, server-side paging state, operator views, and live synchronization between tabs.