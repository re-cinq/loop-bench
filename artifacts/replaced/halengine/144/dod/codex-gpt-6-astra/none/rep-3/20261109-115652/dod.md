# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The public `createHalEngine` factory and real WebSocket connections expose the missing protocol behavior today; `validateMessage` exposes its static validation. Four tests exercise real stores, with forwarding adapters recording actual arguments or restricting optional capabilities, and a lifecycle policy holding a real turn before model access; no model, socket, or store responses are mocked.

## Done when these pass

- [ ] **accepts bounded list requests and composite cursors while rejecting malformed fields** — Static validation, field-specific wire errors, and legacy message literal compatibility.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated user and pages tied activity before resuming a listed conversation** — Public configuration wiring, exact metadata, authenticated store arguments, composite cursor paging, current conversation inclusion, no unsolicited lists, existing resume replay, and the history-without-resume warning.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports unsupported history and store failures as errors without closing the socket or exposing details** — Default-off and disabled history, missing store/collection capability, a real closed Mongo client failure, sanitised logs, and a responsive socket.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history while a turn holds the session lock and emits no history stream_end** — A request completes while a real turn is held by an asynchronous policy; only the turn emits its terminal frame.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and additive union members; preserve existing message contracts and validate the amended composite cursor.
- [ ] Thread the independent default-off history option from `createHalEngine` through `createServer` to the handler, including the retention note pointing to #41 and startup warning when resume is off.
- [ ] Answer metadata requests outside the turn lock using `ws.userId` and unchanged paging options, with ISO dates and no unsolicited frames or `stream_end`.
- [ ] Add `UNSUPPORTED` and exported `StoreCannotList`, distinguish unsupported capabilities from transient failures, and sanitise client errors and session-scoped logs.
- [ ] Keep listing and the existing ownership-checked resume/replay path working together.
- [ ] Finish consumer documentation through `example/full-config.ts` and `npm run docs:fix`, add the Unreleased changelog entry and MINOR release metadata, and satisfy CI's existing build, coverage, documentation and spec gates.

## Out of scope

- Titles/previews, deletion, operator access to other users, server-held paging state, live tab synchronisation, and new replay or switch protocols.
- Store ordering and retention behavior already validated by #143; the protocol tests consume those real stores.
- Unrelated unlinked statements in the general WebSocket protocol spec; #144's transport requirements are linked under the conversation-list spec's client-access section.