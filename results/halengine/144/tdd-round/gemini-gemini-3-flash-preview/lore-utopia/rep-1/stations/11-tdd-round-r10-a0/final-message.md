I have completed the cleanup of the transport layer's traceability and code quality, resolving all CI failures identified in the round brief and local runs.

This round focused on a broad fix of **31+ ESLint errors** across the test suite, along with misplaced spec links and unused variables. My primary goal was to reach a clean-build state by ensuring that every test in the transport layer is correctly anchored to its normative requirement in the specifications.

### Changes:
- **ESLint Spec Links:** Updated `messageHandler.test.ts`, `beforeToolCall.test.ts`, `connectionHandler.test.ts`, and `helpers.test.ts` to include the required `([validated by: ...])` suffixes in all test titles.
- **Specification Traceability:** Updated five specification files (`websocket-protocol`, `npm-release`, `abandon-on-close`, `awaitable-session-store`, and `session-lifetime`) with validation links pointing back to their verifying tests.
- **Placement Fix:** Resolved a `check:spec-links` failure in the WebSocket protocol spec where a validation link was misplaced relative to other parentheticals.
- **Clean Acceptance Test:** Removed an unused `eventually` import in `conversationList.acceptance.test.ts`.
- **DOD Update:** Updated `.lore/dod.md` to reflect the completion of these CI-related tasks.

### Verification:
- **ESLint:** Ran `npx eslint src/transport` and confirmed zero remaining errors.
- **Spec Links:** Ran `npm run check:spec-links` and verified all links are correctly placed.
- **Tests:** Ran the acceptance suite and all modified unit test files; all 71 tests passed.
- **Formatting:** Applied Prettier across all modified files.

The branch is now merged with `origin/main` and pushed. This comprehensive stabilization should result in a green CI build, allowing the ticket to proceed to the final verification of any remaining edge cases.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix broad ESLint spec-link failures across transport layer","tdd_next":"acceptance green"}}