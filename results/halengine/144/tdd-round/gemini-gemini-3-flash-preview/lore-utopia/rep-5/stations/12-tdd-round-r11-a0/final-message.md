I have addressed the CI failures reported from the previous round by fixing the ESLint errors in the affected files.

### Changes Made:
- **`src/transport/ws/messageHandler.concurrency.test.ts`**:
    - Moved variable declarations for `hasEntryUpsert`, `hasSessionList`, and `hasStreamEndFinally` closer to their first use within the `expect` block to satisfy the `re-lint/declare-near-use` rule.
    - Adjusted the placement of `turn` and `noStreamEndYet` to ensure they remain within the 5-statement limit between declaration and use.
- **`src/transport/ws/validation.ts`**:
    - Added `// eslint-disable-next-line camelcase` suppressions for the `user_message` and `list_sessions` keys in the `validators` object. This was necessary because the protocol uses snake_case literals for message types, which conflict with the project's `camelcase` rule, and Prettier automatically strips quotes from these keys if they are not strictly required, making them identifiers that trigger the lint error.
    - Formatted the file with Prettier to ensure consistency.

### Verification:
- Ran `npm run spec:names`, `npm run check:spec-links`, and `npm run check:spec-status`, all of which passed.
- Verified that the `Conversation List` feature is fully documented in `specs/hal-engine-websocket-protocol/spec.md`, `specs/hal-engine-conversation-list/spec.md`, and `docs/getting-started.md`.
- Confirmed that `example/full-config.ts` and `CHANGELOG.md` are correctly updated for the new feature.
- Verified that all facets in `.lore/dod.md` are already marked as completed.

The changes have been committed and pushed to the `loop-bench/144` branch. The branch was also successfully merged with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair (eslint, prettier)","tdd_next":"acceptance green"}}