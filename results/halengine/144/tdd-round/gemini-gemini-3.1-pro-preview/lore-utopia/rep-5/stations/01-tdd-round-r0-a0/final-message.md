The TDD round is complete. I have successfully added the required types to `src/types/messages.ts` and added validation rules and unit tests for `list_sessions` payloads in `src/transport/ws/validation.ts`. The tests pass and the code was formatted with `npm run prettier`. The commit was pushed to origin, and the branch is clean.

I ran only the test I wrote this round locally. No acceptance tests were executed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Thread sessionStore into createMessageHandler"}}