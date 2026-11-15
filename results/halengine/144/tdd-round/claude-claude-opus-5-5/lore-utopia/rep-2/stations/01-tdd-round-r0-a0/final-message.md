I closed two facets this round: the `list_sessions` message types and validation of `list_sessions` frames. The commit is pushed to `loop-bench/144`, the branch is already up to date with `origin/main`, and it is not ahead of its upstream.

**The round**
- **Red:** I added two tests to `src/transport/ws/validation.test.ts`. The one that accepts a `list_sessions` frame with `limit` and `before` and drops the client's `userId` failed. The one that rejects eight malformed frames already passed, because the validator turns away any unknown type.
- **Green:** `src/types/messages.ts` gains `ListSessionsMessage`, `SessionSummaryFrame` and `SessionListMessage`, added to the incoming and outgoing unions. No existing line changed. Both `src/index.ts` and `src/types/index.ts` export them. `validation.ts` now handles `list_sessions`: `limit` must be a non-negative integer, `before` must be an `{updatedAt, sessionId}` cursor with a 1–128 character `sessionId` and an `updatedAt` that parses as a date, and any other field is dropped.
- **Refactor:** I made the type narrowing explicit, since I couldn't run the typechecker here. Both tests stayed green (5 of 5 in that file). I checked that no exhaustive switch over the message unions breaks.
- **Traceability:** I added § 4.3 `list_sessions` to `specs/hal-engine-websocket-protocol/spec.md`, with statements linking to the two tests. There is no reanchor script; the new tests sit at the end of the file, so the existing links didn't move.
- **dod.md:** I ticked both facets and narrowed the documentation facet to what is still owed.

This was the first round, so there was no CI verdict to work from. The only test run was my own file, run directly with Jest. Red tests: 1 was mine and 0 were regressions.

**Discrepancy to check:** `.lore/dod.md` and the acceptance tests use `list_sessions` and `session_list`, and expect an empty list when the store has no `listFor`. The ticket asks for `list_conversations` and `conversation_list`, an `UNSUPPORTED` error in that case, and a `transport.history` opt-in. I followed the dod and the acceptance tests, as instructed, but the ticket's acceptance criteria won't be met as written. Someone should settle which one is right.

**Smell noticed, not acted on:** the `test-commands.yml` comment and the Jest setup need `--experimental-vm-modules`, so a plain `npx jest` fails to load the ESM test files.

Next round: pass the session store into `createMessageHandler` and connect it in `createServer`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in validation.ts (with the ListSessionsMessage/SessionSummaryFrame/SessionListMessage types)","tdd_next":"Thread sessionStore into createMessageHandler and wire it in createServer"}}