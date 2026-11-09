# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `validateMessage` and `createHalEngine` already expose the real entry points. Real WebSocket connections exercise authentication, configuration, the handler, store pagination and resume; a consumer hook holds a real turn open without calling a model service, and real Mongo adapters exercise unsupported and failed listing.

## Done when these pass

- [ ] **validates history limits and complete wire cursors without changing existing frames** — accepts the additive frame, rejects invalid limits and incomplete cursors by field, and preserves existing message literals.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the socket owner on request and pages resumable metadata without dropping ties** — observes one metadata-only response, records the actual delegated store arguments, pages tied rows, includes the current session and reconnects to a listed conversation.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **distinguishes disabled or unavailable history from store failures without closing or leaking** — pins independent opt-in, unsupported adapters, sanitized failures, session-scoped logging, the exported capability error and the history-without-resume warning.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a history request while a real user turn still holds the session lock** — receives the list before releasing the turn and before its terminal frame.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces, union members and `UNSUPPORTED` code without changing existing message contracts; validate the amended composite wire cursor.
- [ ] Thread the independently disabled-by-default `transport.history` option through the factory and server to the handler; use the authenticated socket identity and pass `{limit, before}` unchanged.
- [ ] Answer one metadata-only list per request off the turn lock, preserving store ordering, ISO times, tie-safe pagination and the existing reconnect/replay path.
- [ ] Refuse unavailable history with `UNSUPPORTED`, export and use `StoreCannotList`, sanitize other failures as `SERVER_ERROR`, log the session without user content, and leave the socket usable.
- [ ] Warn when history is enabled without resume; mirror the retention note pointing to #41 on the new options type.
- [ ] Complete consumer documentation through `example/full-config.ts` and `npm run docs:fix`, add the Unreleased changelog entry and MINOR version bump, and retain the spec citations without claiming implementation before the tests pass.

## Out of scope

- Conversation previews or titles, client deletion, operator access, server-side paging state, live tab sync and any second replay or authorization route.
- Existing store-list behavior from #143 and unrelated uncited WebSocket protocol requirements.
- No model-service call or Mongo daemon is needed: the turn is held and vetoed by a configured consumer hook; the failure case uses a deliberately closed real Mongo client, with connection storage delegated to the real in-memory store.