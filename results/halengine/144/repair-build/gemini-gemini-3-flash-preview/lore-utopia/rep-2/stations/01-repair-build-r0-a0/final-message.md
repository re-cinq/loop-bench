I have completed the task of fixing the red build for ticket #144. 

### Research and Diagnosis
- The CI build failed due to several **ESLint errors** (duplicated code, missing early returns, and flag parameters) and a **test failure** in `src/transport/conversationList.acceptance.test.ts`.
- Investigation revealed that the `list_sessions` logic was partially implemented but lacked the actual handler in `messageHandler.ts`, and the validation was too permissive (allowing `limit: 0` when the ticket required `1-200`).
- The failing test expected an empty list when `listFor` was missing, whereas the ticket explicitly required an `UNSUPPORTED` error code in that case.

### Strategy and Implementation
- **Protocol & Validation:** Added the `UNSUPPORTED` code to `ErrorCodes` and updated `validateMessage` to enforce the `1-200` limit range.
- **Configuration:** Added a `history: {enabled: boolean}` opt-in flag to `HalEngineConfig` and `HalServerOptions`, threading it through to the transport layer.
- **Handling:** Implemented the `handleListSessions` logic in `src/transport/ws/messageHandler.ts`. It now correctly checks for the feature flag and store implementation, returning `UNSUPPORTED` or `SERVER_ERROR` as appropriate.
- **Refactoring:** Moved shared test utilities (`eventually`, `delegatingTo`, `stopEngines`) into `src/transport/wsTestSupport.ts` to resolve `re-lint/no-duplicate-code` errors across multiple test files.
- **Documentation:** Updated `example/full-config.ts` with the new history option and regenerated `docs/getting-started.md` using `npm run docs:fix`.

### Verification Results
- **Tests:** Ran the specific test suites that were failing or affected by the changes (`conversationList.acceptance.test.ts`, `sessionResume.test.ts`, `validation.test.ts`). All 33 tests passed locally.
- **Linting:** Addressed all reported ESLint findings by refactoring `askAfterConnect` for early returns and deduplicating code blocks.
- **Branch Status:** Successfully pushed the fixes to `origin/loop-bench/144` and verified that the branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Implemented list_sessions handler, added UNSUPPORTED error code, fixed limit validation, and deduplicated test utilities to resolve ESLint and test failures."}}