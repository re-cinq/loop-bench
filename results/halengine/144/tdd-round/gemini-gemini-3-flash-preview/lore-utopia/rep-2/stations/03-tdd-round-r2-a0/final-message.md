I have completed the round by fixing the compilation and lint errors reported by CI, and resolving the "rotten" spec links caused by previous changes.

### Changes Made:
- **Fixed Compilation Errors:** Added missing imports for `StoreCannotList` and `SessionStore` in `src/infrastructure/stores/mongo/mongoSessionStore.ts` and `src/transport/ws/messageHandler.test.ts`.
- **Resolved ESLint Violations:**
    - Replaced non-deterministic `new Date()` calls with `new Date(0)` in `messageHandler.test.ts`.
    - Added required spec links to the new `list_sessions` tests.
    - Resolved duplicate code warnings by refining the test block structure.
- **Updated Spec Documentation:**
    - Corrected `specs/hal-engine-conversation-list/spec.md` to accurately reflect that the server answers with an `UNSUPPORTED` error (rather than an empty list) when history is disabled or the store lacks listing capabilities.
- **Repointed Spec Links:** Updated line numbers for all citations to `messageHandler.test.ts` across the entire `specs/` directory to account for shifts caused by new imports and tests.
- **Verification:** Ran the full suite in `src/transport/ws/messageHandler.test.ts` using Jest; all 57 tests passed.

I have pushed the changes and verified that the branch is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix compilation and lint errors in the previous implementation","tdd_next":"acceptance green"}}