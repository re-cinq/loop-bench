I have addressed the CI failures reported in the previous round, which blocked the ticket from reaching "acceptance green" status.

### Changes Made:
- **Typecheck Fix:** In `src/transport/createServer.ts`, corrected the call to `createMessageHandler` by passing `options.history` wrapped in an object to match the expected signature.
- **ESLint Refactoring:**
    - In `src/transport/ws/validation.ts`, replaced the 3-way `switch` dispatch with a lookup table to satisfy the `prefer-polymorphism` rule.
    - Renamed the generic `data` variable to `listSessionsMessage` in `validateListSessionsMessage`.
- **Test Alignment & Traceability:**
    - In `src/transport/ws/validation.test.ts`, split tests containing multiple `expect` calls into individual tests with single assertions.
    - Added the required spec links to all validation tests.
    - Renamed the tests to exactly match the citations in the specification file.
- **Documentation & Spec:**
    - Updated `specs/hal-engine-websocket-protocol/spec.md` with the new validation test citations.
    - Added a detailed entry for "List conversations over WebSocket" to `CHANGELOG.md` under `## [Unreleased]`.
- **Traceability Maintenance:** Ran `npm run spec:names:fix` to automatically re-anchor all 804 spec citations to their correct line numbers following the code changes.

### Verification:
- Ran `src/transport/ws/validation.test.ts` and `src/transport/createServer.test.ts` using Jest; all 20 tests passed.
- Verified that `npm run spec:names` reports no findings.
- Formatted all changed files with Prettier.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fixed CI failures: typecheck, eslint, spec-names, and changelog","tdd_next":"acceptance green"}}