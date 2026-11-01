# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real `createHalEngine` factory, WebSocket upgrade and `validateMessage` already provide the entry points. Five acceptance tests use real sockets, in-memory storage and Mongo store failures; recording delegates preserve the store's real behavior, and a lifecycle hook holds a turn before any external model call.

## Done when these pass

- [ ] **validates history limits and complete composite cursors independently of configuration** — Accept the new frame, strip untrusted user ids, and reject invalid limits and incomplete cursors with field-specific messages.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated owner with wire dates, pages ties, and resumes a listed conversation** — Opt-in reaches the real factory; one requested metadata-only list uses the recorded authenticated id and paging arguments, includes the current session, never pushes or ends a turn, and opens through existing resume/replay.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED for disabled history and stores or collections unable to list** — Absent/false history, a legacy store and a Mongo collection without find produce an error rather than an empty history.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **contains a real store rejection in one safe SERVER_ERROR and logs its session without user content** — A Mongo configuration rejection stays inside the request; its safe error leaves the socket usable and logs session context without content or credentials.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history while the same session has an unfinished turn holding its lock** — A requested list completes while a real orchestrator turn is held by its lifecycle hook, before stream_end; cleanup aborts before reaching the provider.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and union members, preserving existing messages and ConnectedMessage; add a compilation fixture for the existing literals.
- [ ] Accept composite cursors and bounded integer limits in the static validator, with INVALID_MESSAGE naming invalid fields.
- [ ] Thread independent, default-off transport.history through createHalEngine/createServer; warn when history is enabled without resume.
- [ ] Answer requested lists outside the turn lock, using ws.userId and unmodified paging options; serialize summary dates as ISO strings without content.
- [ ] Add UNSUPPORTED and exported StoreCannotList; distinguish disabled/unavailable listing from safely logged SERVER_ERROR failures.
- [ ] Preserve the existing ownership-checked resume/replay route for selecting a listed conversation.
- [ ] Document deployer opt-in and retention (#41) on the options and protocol; edit example/full-config.ts and regenerate getting-started with docs:fix, including the resume prerequisite.
- [ ] Add the installer-facing Unreleased entry and MINOR version bump; CI checks compilation, coverage, documentation and spec links.

## Out of scope

- Titles/previews, deletion over the socket, operator access to another user's history, server-held paging state and live tab synchronization.
- Reimplementing store ordering/pagination or resume, already covered by #143 and #45.
- Source-text assertions about additive diffs, documentation or version numbers; those remain review/CI facets rather than behavioral tests.
- Changing the Lore runner: its current descriptors expose id/name/file only, with no spec metadata hook; test comments and trailing spec citations provide traceability without running the runner's full-suite listing command.