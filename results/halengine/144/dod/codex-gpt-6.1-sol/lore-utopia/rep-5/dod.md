# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The public engine factory, real WebSocket upgrade and shipped stores already provide a callable seam. Tests exercise client frames without replacing the handler, validator, orchestrator or stores.

## Done when these pass

- [ ] **validates bounded history requests and complete wire cursors independently of configuration** — Accept the additive frame and validate its bounded limit and composite cursor.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the socket owner, pages composite cursors and resumes a listed conversation** — Authenticate ownership, record actual store arguments, serialize metadata, page and replay a listed conversation.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED when history is off or the store has no list capability** — Refuse disabled and unavailable history explicitly, including a Mongo collection lacking find.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history while a turn holds the session lock** — Read history before the pending turn ends.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports a real store failure without leaking details or closing the socket** — Report a Mongo connection failure safely and preserve the connection.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and union members additively; preserve existing message literals and ConnectedMessage.
- [ ] Accept and sanitize list frames with bounded limits and complete composite cursors.
- [ ] Thread independent default-off history options from the public factory to the unlocked handler; take ownership only from ws.userId.
- [ ] Send ISO metadata summaries and pass paging arguments unchanged; retain the existing resume path.
- [ ] Add UNSUPPORTED and exported StoreCannotList, distinguish unavailable history from safe SERVER_ERROR, and log failures without content.
- [ ] Warn when history is enabled without resume; document GDPR and retention on the options type with #41.
- [ ] Update example/full-config.ts and regenerate getting-started docs with docs:fix; add consumer changelog entry and MINOR version bump.
- [ ] Finish spec frame documentation and citations without changing status prematurely; CI validates compilation, compatibility, coverage and documentation gates.

## Out of scope

- Titles or previews, client deletion, operator views, server-held paging state and live synchronization across tabs.
- Changes to resume ownership or replay semantics and production implementation in this acceptance-test commit.