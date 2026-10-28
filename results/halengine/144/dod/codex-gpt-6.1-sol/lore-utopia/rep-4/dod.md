# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The public `createHalEngine` factory and `validateMessage` are existing seams. Real WebSocket connections, real stores and a recording store decorator exercise the boundary without replacing its behavior; a supported consumer hook holds a real turn before any external model request.

## Done when these pass

- [ ] **validates history frames and composite cursors without accepting malformed paging fields** — Static validation accepts the new frame, strips untrusted fields and rejects invalid paging values by field name.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the socket owner metadata, pages with the wire cursor and resumes a listed conversation** — The opt-in flows through the public factory; only authenticated metadata is sent on request, with recorded ownership and paging arguments and the existing reconnect replay.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED without a list when history is off or the store cannot list** — Covers default off, explicit off, the five-member legacy store and a real Mongo driver adapter without `find`.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports a real database list failure safely and keeps the socket usable** — A Mongo connection refusal becomes a sanitized SERVER_ERROR with a session-scoped log and a usable connection.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history before an active turn releases the per-session lock** — A pending turn cannot hold up history or make history emit stream_end.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four additive protocol interfaces and union members, preserving existing message literals and ConnectedMessage; accept the composite cursor, not the superseded timestamp-only shape.
- [ ] Thread independent default-off transport.history options through the factory and server; mirror the resume retention note and warn when history is enabled without resume.
- [ ] Answer on the non-locked path using ws.userId and unchanged paging options; serialize dates, send metadata only and never push unsolicited lists.
- [ ] Return UNSUPPORTED for disabled or unavailable listing, export StoreCannotList and distinguish it from a sanitized, session-logged SERVER_ERROR.
- [ ] Preserve the existing authenticated session-id resume and replay path for listed conversations.
- [ ] Complete protocol field tables and consumer documentation through example/full-config.ts and docs:fix; add the consumer changelog entry and MINOR version bump, retaining the GDPR and retention explanation.
- [ ] Turn these five red tests green and complete CI checks without weakening them; preserve spec citations and descriptor spec anchors.

## Out of scope

- Conversation titles or previews, client erasure, operator access to other users, in-band conversation switching, server-side paging state and live synchronization between tabs.
- Reimplementing #143 store ordering or #45 resume authorization; their existing implementations are used here.
- Provider streaming behavior: the concurrency test holds a real turn at the consumer hook before the model is contacted; no external model service or credentials are required.