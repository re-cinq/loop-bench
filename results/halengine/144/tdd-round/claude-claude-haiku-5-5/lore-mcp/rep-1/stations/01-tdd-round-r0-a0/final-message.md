This round closed one step of the validation facet. The bare `list_sessions` frame now passes validation and drops a client-supplied `userId`. It is committed and pushed to `loop-bench/144` (f291811 → 56908d8), and the branch is in sync with its upstream. The merge with `origin/main` was a no-op.

- **Red test:** `src/transport/ws/validation.test.ts`, "accepts a bare list_sessions frame and drops a client-supplied userId". It failed with `Unknown message type: list_sessions`, then passed with the change. The file now runs 4 of 4 green.
- **Code:** `ListSessionsMessage` added to `IncomingMessage` in `src/types/messages.ts`, and a `list_sessions` case in `src/transport/ws/validation.ts`.
- **Formatting:** prettier ran on the three changed files; they were already formatted.
- **Acceptance tests:** I did not run `src/transport/conversationList.acceptance.test.ts` or any other acceptance test, as the brief requires. CI's verdict is the next signal.
- **Regressions:** none known. Red tests I wrote this round: 1. Regressions: 0 (no CI verdict was available to me).

**Not finished:** the `limit` and `before` validation, the outgoing `SessionListMessage` and `SessionSummaryFrame` types, the handler, the store threading, the `createServer` wiring, and the specs. These are now unchecked facets in `.lore/dod.md`. The validation facet is not ticked because only the bare-frame half is done.

**Choices and discrepancies:**
- The repo's test runner is Jest (`node --experimental-vm-modules node_modules/jest/bin/jest.js`), not Vitest as the brief says. I ran the single file by path.
- The ticket names the frames `list_conversations` and `conversation_list`. The acceptance tests and `.lore/dod.md` use `list_sessions` and `session_list`. I followed the acceptance tests, since they are the bar. The naming needs to be settled before the handler facet.
- The `.lore/dod.md` facets were written before the ticket's amendments. The cursor in `before` is `{updatedAt, sessionId}`, and the spec, `StoreCannotList`, and the opt-in `transport.history` flag are not in the facet list.

Unrelated smell noticed, not touched: `validation.test.ts`'s opening comment mentions an alias that is "gone", which reads as a stale note.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validation: bare list_sessions frame accepted, userId dropped","tdd_next":"validation: limit and before checks returning INVALID_MESSAGE"}}