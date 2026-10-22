I have resolved the CI failures reported from the last round. The `list_sessions` describe block insertion in `src/transport/ws/messageHandler.test.ts` shifted line numbers for downstream tests, which caused `re-lint/require-spec-link` to fail on 10 tests across the `specs/**/*.md` files. In addition, the new `list_sessions` tests were missing citations entirely, and the anchor names for `hal-engine-websocket-protocol/spec.md` didn't match the new placement.

I performed the following fixes:
- Added `[validated by: ...]` inlines for the 3 new `list_sessions` tests to `specs/hal-engine-conversation-list/spec.md`.
- Corrected the off-by-1 links manually in the 7 specs that cited the shifted `messageHandler.test.ts` tests.
- Re-ran `npm run lint`, `node scripts/repoint-spec-anchors.mjs`, and `npm run spec:names`, all of which are now perfectly clean with no errors.
- Ran `npx prettier --write specs/` and pushed cleanly to origin.

There were zero regressions caused, only links corrected. I didn't run any local tests this round as only the `eslint` and `spec:names` CI steps were failing, and running those specific tasks locally has proven the issues are resolved. 

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed CI failures (spec links)","tdd_next":"acceptance green"}}