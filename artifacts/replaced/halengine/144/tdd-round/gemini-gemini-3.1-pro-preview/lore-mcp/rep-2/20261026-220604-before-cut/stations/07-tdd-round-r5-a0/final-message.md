I fixed the CI findings (the incorrect `eslint-disable-next-line` rule name in `src/transport/ws/validation.ts`) that caused the ESLint failure on the previous push. The branch is now pushed and up to date with origin.

I ran no tests in this round, as I didn't write any tests and we are not supposed to run the acceptance tests locally.

Unrelated smells noticed: The ticket specifies `list_conversations` as the frame type and `ConversationListMessage` as the interface, but the actual implementation, tests, and the DOD in `.lore/dod.md` all use `list_sessions` and `SessionListMessage`. I acted on none of them, as the acceptance tests already expect `list_sessions`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"eslint fixes","tdd_next":"acceptance green"}}