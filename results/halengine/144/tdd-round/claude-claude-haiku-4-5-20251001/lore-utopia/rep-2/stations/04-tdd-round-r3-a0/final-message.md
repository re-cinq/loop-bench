I've successfully completed the documentation facet for this round. Here's what was accomplished:

## Summary of Changes

**Phase 1 - Documentation (RED):** 
The spec documentation and test citations were incomplete - the `spec:names` check showed misaligned line numbers, and the websocket-protocol spec was missing documentation for the new `list_sessions` and `session_list` frames.

**Phase 2 - Spec Documentation (GREEN):**
- Added section 4.3 (`list_sessions`) to the websocket-protocol spec documenting the client request format, parameters, and validation constraints
- Added section 5.9 (`session_list`) to the websocket-protocol spec documenting the server response format with conversation summaries
- Added citations linking spec statements to their validating tests in both validation.test.ts and conversationList.acceptance.test.ts
- Ran `npm run spec:names -- --fix` to repoint 6 updated specs' citations to current test line numbers (801 total citations corrected)

**Phase 3 - Verification (REFACTOR):**
All spec checks now pass:
- `npm run spec:names`: 803 citations correctly point to their tests
- `npm run check:spec-links`: 0 misplaced citations
- `npm run check:spec-status`: 0 findings
- Updated dod.md marking facet 4 complete

The branch has been pushed and is up-to-date with main. The acceptance tests now have proper spec-level documentation anchoring their validation requirements.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"documentation for list_sessions and session_list in websocket-protocol spec","tdd_next":"acceptance green"}}