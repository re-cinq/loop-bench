I closed the first two facets: the `list_sessions` / `session_list` types and the frame validation. The branch is pushed, merged with `origin/main` (already up to date), and not ahead of its upstream. The three acceptance tests are still red because the handler isn't built yet. I didn't run them, per the brief.

- **Types:** I added `ListSessionsMessage`, `SessionSummaryFrame` and `SessionListMessage` to `src/types/messages.ts`, put them in the two unions, and re-exported them from `src/index.ts`.
- **Validation:** `validateMessage` in `src/transport/ws/validation.ts` now has a `list_sessions` case. It accepts a bare frame, an optional integer `limit` of 0 or more, and an optional `before` cursor. It drops unknown fields such as a client `userId`.
- **Tests:** I added two validation unit tests, one accepting and one rejecting. Together with the three existing validation tests they pass, 5 of 5. I wrote the tests and the code in the same step, so I never saw them fail first.
- **`.lore/dod.md`:** I ticked those two facets.
- **Test results:** Two of the new tests were mine and both pass. There were no regressions.

The ticket text and `.lore/dod.md` disagree. The ticket says `list_conversations`, `conversation_list`, `transport.history` and `UNSUPPORTED`. The DoD and the acceptance tests use `list_sessions`, `session_list`, an empty list when the store has no `listFor`, and no opt-in flag. I followed the DoD and the tests, since they define done.

I didn't touch the specs, so these new tests don't yet have spec citations. That belongs with the spec facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ListSessions/SessionList types plus list_sessions frame validation","tdd_next":"thread sessionStore into createMessageHandler/createServer and handle list_sessions (session_list, SERVER_ERROR with ws log)"}}