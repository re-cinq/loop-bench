# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The public engine factory, validator and message-handler factory already expose the boundary. Tests use real WebSockets, the shipped mock provider and real stores; a recording subclass delegates every list operation to the in-memory store. The failure test uses a real Mongo store with an invalid connection string, which fails before any network access.

## Done when these pass

- [ ] **validates history limits and composite cursors independently of deployment options** — Accept the new frame and reject malformed paging fields by name.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the socket owner metadata, pages ties with the wire cursor, and resumes a listed conversation** — Pin ownership on both frames and recorded store arguments, metadata serialization, paging, request-only delivery, the current empty session and existing replay.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED with no list when history is absent, disabled, or the store cannot list** — Distinguish missing capability from an empty history.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a history request before the active turn ends without acquiring its lock** — A real orchestrator lifecycle hook holds a turn while history is requested.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **sanitizes a real store failure, logs the session id, and keeps the socket usable** — Drive the handler over real sockets against the Mongo store's real failure path.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four additive protocol interfaces and union members while preserving old message literals and ConnectedMessage.
- [ ] Validate optional limits and the amended composite cursor without consulting deployment configuration.
- [ ] Thread the separate history opt-in through the public engine factory and server to the handler; the direct handler failure test supplies `(orchestrator, store, historyOptions)` as its dependencies.
- [ ] Answer from ws.userId outside the turn lock, passing both optional paging fields and serializing metadata only.
- [ ] Map absent capability and StoreCannotList to UNSUPPORTED; sanitize unexpected store failures and log the session id without user content.
- [ ] Document the opt-in and retention decision, warn when history is enabled without resume, regenerate getting-started from example/full-config.ts, and add the consumer changelog entry and MINOR release declaration.

## Out of scope

- Conversation previews or titles, deletion frames, operator access to another user's history, server-held paging state and live tab synchronization.
- Changes to the existing resume protocol or a second replay implementation.