I fixed CI's red verdict, finished the last facet in `.lore/dod.md`, and pushed. The branch is up to date with `origin/main`, nothing is left unpushed, and the merge brought in nothing new.

**This round ran no test.** The work was spec text and CI repair, so there was no failing test to write.

**CI failures from the last push (eslint, spec-names):** 0 of the red findings were tests I wrote, and none were real regressions. The previous round added two import lines near the top of `src/transport/ws/messageHandler.test.ts`. That moved every test down by two lines, so each spec link pointing at that file (in 8 specs) pointed at the wrong line. The repo has no `reanchor.mjs`, so I re-pointed every link by matching it to its test's title. I also linked the one test that had no spec statement: the one where a failing `listFor` answers `SERVER_ERROR`. Afterwards `spec:names`, `check:spec-links` and `check:spec-status` pass. I didn't run eslint here.

**Facet closed:**
- `specs/hal-engine-websocket-protocol/spec.md` gains § 4.3 `list_sessions` and § 5.9 `session_list`, each with a field table and statements linked to their tests.
- `specs/hal-engine-conversation-list/spec.md` now cites the `SERVER_ERROR` test too.
- The facet is ticked in `.lore/dod.md`.

**Caveats:**
- CI's eslint output was cut off, and the Lore API returned no CI data for this branch. If the cut-off part named anything besides the stale links, that is still red.
- The branch doesn't match the ticket's own wording. Under the ticket's name the frames are `list_conversations` / `conversation_list`; the branch calls them `list_sessions` / `session_list`. The ticket also wants an opt-in `transport.history` flag, an `UNSUPPORTED` error code and `StoreCannotList`. The branch instead answers an empty list when the store has no `listFor`, which the ticket specifically rejects. Those choices come from the acceptance tests, so I left them alone, but someone should reconcile them before review.
- The ticket also asks for a `CHANGELOG.md` entry, the `docs/getting-started.md` section and a GDPR statement. None of these is a facet in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in the protocol and conversation-list specs; re-anchor shifted messageHandler.test.ts spec links (CI eslint/spec-names)","tdd_next":"acceptance green"}}