This round closed the bare-frame part of facet 2 and is pushed. The branch is in sync with its upstream and has no drift from `origin/main`.

**What changed**
- `src/transport/ws/validation.test.ts`: one new failing test, "accepts a bare list_sessions frame and returns it with no limit or before". I confirmed it red first ("Unknown message type: list_sessions").
- `src/types/messages.ts`: added `ListSessionsMessage` (`limit?`, `before?: SessionCursor`) and put it in `IncomingMessage`. This was needed so the validator's return type typechecks.
- `src/transport/ws/validation.ts`: a `list_sessions` case returning `{type: 'list_sessions'}`. The test is now green (4/4 in that file).
- `.lore/dod.md`: facet 2 is split. The bare-frame half is ticked. A new unchecked facet covers `limit` and `before` validation. Facet 1 stays open: `SessionSummaryFrame`, `SessionListMessage` and the re-exports are still missing.
- Formatted with prettier, committed as `6c0a42c`, pushed.

**Tests and tooling**
- The only test run here was `validation.test.ts` via Jest. I did not run the acceptance file `conversationList.acceptance.test.ts`, following the brief.
- The round brief file does not exist, so there was no CI verdict to act on.
- The Lore tools (`lore_query_trace`, `lore_get_ci_failures`) are not available in this session. I could not run the trace before editing `validation.ts` and `messages.ts`. Those edits are additive, and the only existing tests that touch the validator are in the same file I ran.
- The repo runs Jest, not Vitest, so I used the repo's Jest command.

**Test counts for this round:** 1 red test, which was mine, now green. Regressions: none known; I did not run the rest of the suite.

**Naming mismatch to be aware of:** the ticket says `list_conversations` / `conversation_list`, but the acceptance tests and dod use `list_sessions` / `session_list`. I followed the tests, since they are the bar.

**Unrelated smells noticed, not touched:** none worth naming.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate a bare list_sessions frame (facet 2, bare-frame part)","tdd_next":"Validate limit and before on list_sessions in validation.ts"}}