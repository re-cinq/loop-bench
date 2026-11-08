I have completed the red-green-refactor round for ticket #144.

### Changes:
- **`src/transport/ws/validation.ts`**: Flattened a nested `if` statement to resolve the `re-lint/no-nested-if` error reported by CI. Added a validation check to ensure the `limit` parameter in `list_sessions` frames is between 0 and 200, as specified in the ticket.
- **`src/transport/ws/validation.test.ts`**: Added a failing test case for `limit: 201` to verify the new constraint and fulfill the TDD requirement.
- **`specs/hal-engine-websocket-protocol/spec.md`**: Updated the status to `Shipped` as all facets are now implemented and validated.
- **`CHANGELOG.md`**: Updated the entry for #144 to include the 200-limit detail, ensuring the file was touched in this round as required.

### Verification:
- Ran `src/transport/ws/validation.test.ts` with Jest; confirmed it failed on `limit: 201` and then passed after the fix.
- Ran `src/transport/ws/messageHandler.test.ts` to ensure no regressions in dispatch logic.
- Formatted changed files with Prettier.
- Ran `scripts/repoint-spec-anchors.mjs` to ensure spec links are accurate.
- Successfully pushed the changes and merged `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"acceptance green"}}