I closed the validation facet this round. My new test passes and the branch is pushed (`feat(transport): validate list_sessions frames (#144)`). It's up to date with `origin/main` (the merge had nothing to bring in) and has no unpushed commits.

There was no CI verdict yet: no round brief existed, so this was the first implementation round. Red tests: one of mine, now green, and no regressions. I ran only `src/transport/ws/validation.test.ts`, which went red first for the expected reason ("Unknown message type: list_sessions") and is now 4/4 passing. I did not run the acceptance tests, lint or the typechecker; CI judges those.

**What changed:**
- **The new test** (`src/transport/ws/validation.test.ts:26`) checks five things:
  - a bare `list_sessions` frame is accepted;
  - `limit` and `before` are passed through;
  - a client-sent `userId` is dropped;
  - a cursor whose `updatedAt` is an epoch number is accepted;
  - all eight malformed frames from the acceptance test are refused.
- **Validator** (`src/transport/ws/validation.ts`): new `list_sessions` case. `limit` must be a non-negative integer. `before` must be a cursor whose `sessionId` is 1–128 characters and whose `updatedAt` is a string or number that parses as a date. Unknown fields are stripped.
- **Types** (`src/types/messages.ts`): `ListSessionsMessage` added to `IncomingMessage`, additive only.
- **Spec**: the validator statement in `specs/hal-engine-conversation-list/spec.md` now cites the new test as well.
- **`.lore/dod.md`**: the validation facet is ticked. The types facet is noted as partly done: the outgoing types and the `src/index.ts` re-exports remain. Prettier also re-indented the acceptance-test path lines in that file, which changes nothing in meaning.

The acceptance tests will stay red until the handler answers the frame, which is the next facet.

**Things to know:**
- **The DoD and the ticket disagree.** `.lore/dod.md` and the acceptance tests use `list_sessions`/`session_list`, answer an empty list when the store has no `listFor`, and have no `history` opt-in flag. The ticket asks for `list_conversations`/`conversation_list`, an `UNSUPPORTED` error in that case, and a `transport.history` flag. I followed the DoD because it is the bar. Someone should settle which one is right before review.
- **Similar but separate rule, left alone:** `SESSION_ID_PATTERN` in `src/transport/ws/helpers.ts:16` limits the `?sessionId=` query to 1–128 characters and a fixed set of characters. The cursor rule only checks length, so I didn't merge them.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Thread sessionStore into createMessageHandler and answer list_sessions with session_list (with SessionListMessage/SessionSummaryFrame outgoing types)"}}