I have completed the TDD round for ticket #144. I focused on repairing the CI failures left by the previous round and completing the remaining implementation and documentation facets.

### Changes Made:
- **Validation**: Fixed a TypeScript assignment error in `src/transport/ws/validation.ts` by casting the validated `limit` field to `number`.
- **Configuration**: Corrected the `HalServerOptions` mismatch by moving the `history` option to the top level in `createServer` and ensuring it is correctly passed from `HalEngineConfig` in `src/config.ts`.
- **Test Infrastructure**:
    - Converted `src/transport/conversationListHistory.test.ts` from `vitest` to `jest` to align with the project's test runner.
    - Refactored the `askAfterConnect` helper into `src/transport/wsTestSupport.ts` to eliminate code duplication across the test suite.
    - Fixed missing spec links and unused variable warnings in the tests.
- **Specifications & Documentation**:
    - Updated `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md` to correctly document the `UNSUPPORTED` error behavior when history is disabled or the store is incompatible.
    - Synchronized all `[validated by: ...]` links in the specifications with the actual test titles and line numbers.
    - Corrected the "Conversation List" section in `docs/getting-started.md` to match the implemented error handling.
- **Definition of Done**: Ticked all remaining facets in `.lore/dod.md`.

All modified files have been formatted with Prettier, committed, and pushed to the branch. The branch is also up to date with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"all facets complete","tdd_next":"acceptance green"}}