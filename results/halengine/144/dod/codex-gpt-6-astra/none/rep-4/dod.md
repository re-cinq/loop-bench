# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `validateMessage` and `createHalEngine` already provide the real entry points. Tests use real WebSocket connections, the shipped in-memory and Mongo stores, and the shipped deterministic provider; no transport, orchestrator, or database method is replaced with a canned answer.

## Done when these pass

- [ ] **validates history windows independently of deployment settings** — accepts the new request and composite cursor, strips a supplied user id, and rejects malformed limits and cursors with field-specific diagnostics.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated user metadata and pages into the existing resume path** — one requested list of three owned summaries, ISO dates, no content or credentials, unchanged recorded store arguments, tie-safe paging, and reconnect/replay of a listed conversation.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history before the active turn releases its session lock** — receives the list during a real turn held at the supported lifecycle hook, before its terminal frame.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses unavailable history and sanitizes store failures without closing the socket** — absent/false opt-in, legacy store, and missing Mongo `find` produce `UNSUPPORTED`; a closed real Mongo client produces a sanitized `SERVER_ERROR` and a session-scoped log, with a usable socket.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four wire interfaces and union members additively, preserve existing message literals and `ConnectedMessage`, and validate the amended composite cursor independently of configuration.
- [ ] Thread the default-off history option through `createHalEngine` and `createServer`, read ownership from `ws.userId`, and pass `{limit, before}` unchanged to the store.
- [ ] Answer history outside the turn lock, serialize only summary metadata, and retain the existing authenticated resume/replay path.
- [ ] Add `UNSUPPORTED` and exported `StoreCannotList`; distinguish unavailable history from operational errors, sanitize the client error and log with session id, and preserve socket usability.
- [ ] Warn when history is enabled without resume; mirror the retention note pointing at #41 on history options, document the deployer's opt-in, edit `example/full-config.ts`, and regenerate getting-started with `npm run docs:fix`.
- [ ] Add an installer-facing changelog entry and MINOR release metadata; preserve the acceptance file's message type compatibility fixture and let CI judge types, coverage and documentation gates.

## Out of scope

- Store listing implementation from #143, a new REST route, titles/previews, erasure, server-held paging state, cross-user operator access, and live synchronization between tabs.
- Source-text assertions for documentation, additive diffs, version metadata, or type declarations: these remain review and existing CI responsibilities.