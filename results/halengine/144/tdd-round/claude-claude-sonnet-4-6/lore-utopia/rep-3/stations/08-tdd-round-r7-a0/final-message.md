The branch is up to date. 

**What was fixed:** The `re-lint/no-duplicate-code` ESLint error was caused by an identical 8-entry array of malformed `list_sessions` frames appearing in both `src/transport/ws/validation.test.ts` and `src/transport/conversationList.acceptance.test.ts`. Extracted it as `malformedListSessionsFrames` exported from `wsTestSupport.ts`, and updated both test files to import and use it.

The MongoDB test failure (`ENOENT: mongodb-binaries` lock file) is an infrastructure issue in this environment — MongoDB memory server can't download its binary here. That failure is in `src/infrastructure/stores/mongo/mongoConnection.test.ts`, unrelated to this ticket's changes.

Unrelated smell noticed but not touched: the DoD still references `session_list`/`list_sessions` frame names which differ from the ticket's `conversation_list`/`list_conversations` names — the previous rounds resolved this discrepancy (the implementation uses `session_list`/`list_sessions`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint no-duplicate-code by extracting shared malformed-frames constant","tdd_next":"acceptance green"}}