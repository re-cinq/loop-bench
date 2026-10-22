I have completed the round for ticket #144. I prioritized fixing the CI failures identified in the round brief before completing the remaining documentation facets.

### Work Completed
- **Fixed CI Failures:** Resolved `typecheck` and `eslint` errors in `src/transport/ws/listSessions.test.ts`.
    - Fixed `never` type mismatches by correctly typing the `listFor` mock.
    - Resolved ESLint issues: replaced `any[]` with `OutgoingMessage[]`, renamed vague variables (`data` -> `msg`), and split tests to adhere to `max-expects`.
    - Added missing spec links for traceability.
- **Updated Specifications:**
    - Updated `specs/hal-engine-websocket-protocol/spec.md` to include the `transport.history` opt-in requirement and the `UNSUPPORTED` error case.
    - Updated `specs/hal-engine-conversation-list/spec.md` with links to the new unit tests.
    - Marked the WebSocket Protocol specification as **Shipped**.
- **Updated Documentation & Examples:**
    - Added `history: {enabled: true}` to `example/full-config.ts`.
    - Regenerated `docs/getting-started.md` via `npm run docs:fix`.
    - Manually added a new section **§ Conversation List** to `docs/getting-started.md` with usage details and GDPR considerations.
- **Verification:**
    - Verified that `src/transport/ws/listSessions.test.ts` and `src/transport/ws/conversationList.test.ts` pass locally.
    - Formatted all changed files with `prettier`.
    - Updated `.lore/dod.md` to reflect that all facets are now complete.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update docs/getting-started.md via example/full-config.ts","tdd_next":"acceptance green"}}