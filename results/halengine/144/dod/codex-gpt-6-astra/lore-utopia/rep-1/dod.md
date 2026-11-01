# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The pure validator and `createHalEngine` are callable today. Real WebSocket connections exercise the config-to-server path, real stores supply summaries, and a real orchestration hook holds the turn lock without calling a model; MongoDB is stopped to exercise a real store failure.

## Done when these pass

- [ ] **validates history requests and complete composite cursors independently of configuration** — Accept the new frame, preserve valid paging, discard untrusted fields, and reject malformed fields by name.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated owner and pages metadata into the existing resume path** — Opt-in delivery, recorded ownership and paging arguments, ISO metadata, no unsolicited list or stream_end, current-session inclusion, existing replay, and the history-without-resume warning.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses disabled history and stores without listing capability with UNSUPPORTED** — Default off, explicit off, legacy store port, and a real collection adapter lacking find all refuse rather than inventing an empty history.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports a failed list safely while keeping the socket usable** — A real database failure becomes a safe SERVER_ERROR and session-scoped log; ping still works.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history while a real turn holds the session lock** — Listing completes before the pending turn is released, without stream_end.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four additive protocol interfaces and union members, preserving existing message literals and ConnectedMessage; validate the composite cursor and bounded limit.
- [ ] Thread the independent history option from config through createServer, answer on the unlocked path, and pass the authenticated connection identity and paging options to listFor.
- [ ] Serialize metadata only, support paging and the existing resume path, include the current session, and never push unsolicited lists.
- [ ] Add UNSUPPORTED and exported StoreCannotList, distinguish absent capability from failure, redact error details, and log failure with the session id.
- [ ] Warn when history is enabled without resume; mirror the retention note on the history options type and document the deployment choice.
- [ ] Update example/full-config.ts and regenerate getting-started with docs:fix; add the consumer changelog entry and MINOR release designation, preserving existing protocol compatibility.

## Out of scope

- Titles, previews, erasure frames, server-held paging state, operator access to another user, and live sync across tabs.
- Reimplementing store ordering or resume; existing #143 and #45 tests cover those internals.
- Production changes in this commit. CI owns lint, typechecking, builds, coverage and release/documentation gates; no source-text acceptance assertions substitute for those checks.