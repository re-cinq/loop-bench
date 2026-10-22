I have completed one TDD round for ticket #144.

### Research Phase
I started by reviewing the `round-brief.md`, `.lore/dod.md`, and `ticket.md`. The previous round had added message types, but several CI failures were reported:
- **ESLint findings:** Duplicate code between `conversationList.acceptance.test.ts` and `sessionResume.test.ts`, a "prefer-early-return" violation, and missing spec links for some tests.
- **Test finding:** `src/types/messages.test.ts` was flagged as "useless" because it didn't load any production values.
- **Spec findings:** `spec-names` and `changelog` failures were also noted.

### Strategy Phase
My strategy was to first fix all reported CI findings to reach a clean baseline, and then proceed with the next facet: validating `list_sessions` frames in `src/transport/ws/validation.ts`.

### Execution Phase
1.  **CI Fixes:**
    - **Deduplication:** I moved shared helpers `eventually` and `delegatingTo` into `src/transport/wsTestSupport.ts` and updated the test suites to use them.
    - **Early Return:** I refactored the `askAfterConnect` helper in `conversationList.acceptance.test.ts` to satisfy the `prefer-early-return` lint rule.
    - **Useless Test:** I updated `src/types/messages.test.ts` to import and check the `ErrorCodes` value, ensuring it exercises a real module.
    - **Spec Links:** I manually updated the line numbers in `specs/hal-engine-conversation-list/spec.md` to match the actual test locations, resolving the `require-spec-link` findings.
2.  **TDD Loop - Red:** I added failing unit tests to `src/transport/ws/validation.test.ts` covering the validation of `list_sessions` frames, including `limit` and `before` (cursor) fields, and ensuring unknown fields are stripped.
3.  **TDD Loop - Green:** I implemented `validateListSessionsMessage` in `src/transport/ws/validation.ts`, ensuring it correctly validates the cursor's `sessionId` (1–128 chars) and `updatedAt` (valid timestamp), and enforces a non-negative integer for `limit`.
4.  **TDD Loop - Refactor:** I verified the implementation with `jest` and confirmed all unit tests pass. I then updated the WebSocket protocol specification and the conversation list specification to include documentation for these new frames, including back-links to the new unit tests.
5.  **Changelog:** I added an entry to `CHANGELOG.md` for the new WebSocket frames.
6.  **Finalization:** I formatted all changed files with Prettier, updated the Definition of Done in `.lore/dod.md`, and pushed the changes.

The round completed with the validation facet fully implemented and verified by unit tests. The branch is merged with `origin/main` and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate `list_sessions` frames in `src/transport/ws/validation.ts`","tdd_next":"Thread `sessionStore` into `createMessageHandler`"}}