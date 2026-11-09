Branch is up to date with its upstream and the merge was a no-op — the push is confirmed landed.

## Round summary

**Facet closed:** `list_sessions` answered by the message handler (dod facets 1, 3, 4 and 6 — one behaviour and its mechanical prerequisites: the `SessionSummaryFrame`/`SessionListMessage` wire types, the optional `sessionStore` parameter threaded into `createMessageHandler` and wired in `createServer`, the handler branch off the per-session lock, the `sendSessionList` sender, and the index re-exports).

**TDD cycle:** one test, `answers list_sessions with the session user's own summaries, ISO dates, limit and before forwarded and a client userId ignored` in `src/transport/ws/messageHandler.test.ts`. Red for the right reason (store never asked, nothing sent), then green with 55/55 in that file — the 54 pre-existing tests stayed green throughout, and re-ran green after formatting. It's cited as a second `[validated by]` on the conversation-list spec's *Over the WebSocket protocol* statement; `scripts/repoint-spec-anchors.mjs` (this repo's `reanchor` equivalent) repointed 79 anchors with 0 unresolved, and `check-spec-links`, `spec:names` and `check:spec-status` all pass.

**Tests:** 1 red test was mine (now green before commit); 0 regressions — every pre-existing test in the file I touched stayed green. I ran only that one file; the acceptance tests are CI's to judge, and the no-`listFor`, throwing-store and malformed-frame paths they exercise are implemented per the facet but were not run here.

**Smells noticed, not acted on:** the recording fake-socket fixture is now built four times in `messageHandler.test.ts` (a `recordingSocket()` helper could collapse it, but extracting it shifts cited anchor lines); `handlePing` still bypasses `sender.ts` with a raw `ws.send(JSON.stringify(...))`; a store returning a non-`Date` in a summary time position (despite the `SessionSummary` type) would surface as `SERVER_ERROR` from `sendSessionList` rather than as the type violation it is.

**Next facet:** document `list_sessions`/`session_list` in `specs/hal-engine-websocket-protocol/spec.md` (facet 5), then the release tail (facet 7: CHANGELOG, MINOR bump, docs via `example/full-config.ts` + `docs:fix`, `verify`).

Committed as `7f1f04e`, pushed, and confirmed up to date with `origin/loop-bench/144`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"handle list_sessions in messageHandler (store threaded, wire types, sender helper, index exports)","tdd_next":"document list_sessions/session_list in specs/hal-engine-websocket-protocol/spec.md"}}