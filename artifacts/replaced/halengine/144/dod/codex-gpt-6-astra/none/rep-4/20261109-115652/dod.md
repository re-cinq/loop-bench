# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The pure validator and `createHalEngine` are existing entry points; real sockets, the real in-memory store, and real Mongo driver failures exercise the missing protocol. Store instrumentation delegates to the real store, and the pending-turn check holds the real orchestrator in its supported hook before any provider request.

## Done when these pass

- [ ] **validates history limits and composite cursors independently of deployment options** — Static validation accepts the new frame and rejects invalid limits and incomplete or invalid cursors with field-specific errors.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **delivers only the connected user history, pages it during a turn, and replays a selected row** — Public configuration reaches the socket, ownership comes from authentication (including recorded store arguments), metadata is serialized and paged, listing bypasses an occupied turn lock, and a selected row can be resumed.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses disabled history and stores without listing with UNSUPPORTED, never empty history** — Default-off and explicit-off history, missing store capability and a real Mongo adapter exposing no find all fail explicitly.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports a failed store as SERVER_ERROR without leaking details or closing the socket** — A closed Mongo client fails a real listing; the wire and logs remain private and the connection survives.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and union members additively, preserve existing message literals and ConnectedMessage, and validate the amended composite cursor.
- [ ] Thread the independently disabled history option from public config through the server; deliver metadata from ws.userId outside the turn lock, only on request.
- [ ] Add UNSUPPORTED and exported StoreCannotList; distinguish unsupported stores from transient failures and log failures safely.
- [ ] Keep listing and the existing resume/replay path interoperable; warn when history is enabled without resume.
- [ ] Complete protocol frame field tables, GDPR authorization and retention notes referencing #41; update example/full-config.ts and regenerate getting-started with docs:fix.
- [ ] Add the installer-facing Unreleased changelog and MINOR release declaration; let CI judge types, coverage, docs and spec checks without changing spec Status rows in this acceptance commit.

## Out of scope

- Conversation previews, titles, deletion, server-held paging state, operator access and live synchronization between tabs.
- Re-testing the already cited store implementation or unrelated uncited WebSocket protocol requirements.
- Source-text assertions for additive diffs, documentation wording or release metadata: these remain explicit review facets above.
- Changing Lore's descriptor adapter: .lore/test-commands.yml currently exposes only id, name and file, with no spec metadata mechanism; tests carry @spec anchors and statements carry named line citations.