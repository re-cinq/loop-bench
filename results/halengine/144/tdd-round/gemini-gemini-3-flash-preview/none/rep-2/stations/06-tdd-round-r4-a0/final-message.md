I have completed the TDD round for ticket #144. This round focused on resolving CI failures (ESLint and spec-names) that were blocking the green state of the acceptance tests.

### Changes Summary
- **Refactored `src/transport/ws/validation.ts`**: Replaced the 3-way switch with a validator lookup table, extracted helper functions for `limit` and `before` validation to eliminate nested `if` statements, and fixed variable naming to comply with project standards.
- **Deduplicated Test Code**: Moved common logging (`recordLogs`) and robust engine cleanup (`stopEngines`, `eventually`) to `src/transport/wsTestSupport.ts`. Refactored `src/transport/conversationList.acceptance.test.ts` and `src/transport/sessionResume.test.ts` to use these shared helpers, resolving `re-lint/no-duplicate-code` errors.
- **Repaired Spec Links**: Updated `specs/hal-engine-websocket-protocol/spec.md`, `specs/hal-engine-conversation-list/spec.md`, and `specs/hal-engine-session-resume/spec.md` with accurate test line numbers and ran `spec:names:fix` to ensure all traceability links are correct.
- **Fixed Miscellaneous Lint Errors**: Resolved `max-expects`, `declare-near-use`, `camelcase`, and `no-unused-vars` errors across the touched files.
- **Updated DoD**: Added and checked a new facet for fixing the CI failures.

### Verification Results
- **Local ESLint**: Ran `npx eslint` on all modified files; it now returns a clean report with zero errors.
- **Spec Link Check**: `npm run check:spec-links` reports `misplaced: 0`, confirming all traceability links are correctly anchored.
- **Unit Tests**: Ran `src/transport/ws/messageHandler.test.ts` using the project's ESM-compliant test runner; all 57 tests passed, including the refactored `list_sessions` logic.
- **CI Status**: Acceptance tests remain CI's to run; however, the lint and spec-name failures that previously turned the build red have been systematically resolved.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI failures (eslint, spec-names) and refactor transport tests","tdd_next":"acceptance green"}}