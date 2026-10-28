# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The public `createHalEngine` factory, real WebSocket connections and `validateMessage` provide existing seams. The shipped in-memory store and provider exercise the real path; recording delegates to the real store, and a consumer lifecycle hook holds a turn pending.

## Done when these pass

- [ ] **accepts history requests and composite cursors, rejecting invalid fields by name** — Static validation accepts the new frame and rejects invalid limits and incomplete or invalid cursors.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **delivers only the authenticated owner metadata, pages tied rows, and resumes a listed conversation** — One metadata-only wire response, recorded authenticated store arguments, ISO dates, pagination and the existing resume replay.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses history with UNSUPPORTED when disabled or the store has no listFor** — Default off, explicit off and unavailable capability are errors rather than empty history.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a history request before the pending turn ends and never pushes a list unsolicited** — History bypasses the turn lock, includes the current conversation and is only sent when asked.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **sanitizes store failures, distinguishes an adapter without find, and keeps the socket usable** — Real Mongo driver failure and capability absence map to safe, distinct errors; failures log the session id and the connection still answers pings.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four additive wire interfaces and union members, preserving existing message literals and ConnectedMessage.
- [ ] Validate the frame and amended composite cursor, with field-specific INVALID_MESSAGE failures.
- [ ] Thread separate history options and the store from the public factory through the server into the handler.
- [ ] Answer from ws.userId outside the turn lock, retaining the store's order and cursor and serializing only summary metadata.
- [ ] Refuse disabled or unavailable history with UNSUPPORTED; map StoreCannotList likewise and other store failures to sanitized SERVER_ERROR, log with session id, and keep the socket open.
- [ ] Preserve reconnect ownership checks and replay, and never push lists unsolicited.
- [ ] Document both wire frames and field tables, GDPR disclosure and retention, warn on history without resume, regenerate the full-config documentation, and add the consumer changelog and minor version bump.

## Out of scope

- Store ordering and persistence behavior already covered by #143's linked tests.
- Titles, previews, deletion, operator lists, server-held paging state and live tab synchronization.
- Existing unrelated unlinked WebSocket protocol requirements.