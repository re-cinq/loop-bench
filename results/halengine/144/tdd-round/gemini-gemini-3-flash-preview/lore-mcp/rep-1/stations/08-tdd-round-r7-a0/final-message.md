I have completed the round by resolving the CI failures identified in the previous build. I addressed the linting errors related to missing spec links and code duplication, and I updated the specification files to ensure full traceability and documentation of the new features.

### Changes Made:
- **Traceability Fixes**: 
  - Updated `specs/hal-engine-npm-release/spec.md` with corrected line numbers for the server start and stop tests in `src/transport/createServer.test.ts`.
  - Updated `specs/hal-engine-websocket-protocol/spec.md` with new statements and links for the `history`/`resume` configuration warning and the `StoreCannotList` error handling.
  - Updated `specs/hal-engine-conversation-list/spec.md` with corrected line numbers and new links for the `list_sessions` tests in `src/transport/ws/listSessions.test.ts`.
- **Refactoring**: 
  - Introduced an `expectUnsupported` helper in the `harness` of `src/transport/ws/listSessions.test.ts` to eliminate a 12-line code duplication error identified by ESLint.
- **Verification**:
  - Ran `npm run spec:names:fix` to automatically anchor the new spec statements.
  - Verified documentation integrity with `npm run check:spec-links` (0 misplaced links).
  - Confirmed that all modified tests in `src/transport/createServer.test.ts` and `src/transport/ws/listSessions.test.ts` are passing.
- **Maintenance**:
  - Fetched and merged `origin/main` to ensure the branch is up-to-date (it was already up-to-date).

The branch has been pushed to `origin/loop-bench/144`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures (lint and spec-names)","tdd_next":"acceptance green"}}