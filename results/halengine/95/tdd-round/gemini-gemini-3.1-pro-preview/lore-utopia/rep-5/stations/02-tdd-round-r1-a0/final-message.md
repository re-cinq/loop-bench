I fixed the ESLint failures reported in the last CI build:
- Removed the non-deterministic `new Date()` from `sessionWith` in `src/orchestration/onErrorNonError.acceptance.test.ts` by replacing it with a fixed ISO string.
- Added the missing spec link in `specs/hal-engine-config-hooks/spec.md` for the test `called with an Error wrapping a non-Error string rejection when stream fails` in `src/orchestration/chatOrchestrator.test.ts`.

Both files were formatted and the build step `npm run eslint` now passes without any warnings or errors.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}