I have completed the repair round for ticket #144.

In this round, I addressed the following:
1.  **Fixed ESLint Errors**: Refactored `src/transport/ws/validation.ts` to eliminate nested if-statements in `validateListSessionsMessage`, satisfying the `re-lint/no-nested-if` rule reported by CI.
2.  **Updated Spec Status**: Changed the status of `specs/hal-engine-websocket-protocol/spec.md` from `In Progress` to `Shipped` to reflect the completed implementation.
3.  **Enhanced Documentation**: Added the missing `## Conversation List` section and its related GDPR notice to `docs/getting-started.md`, ensuring the documentation aligns with the ticket requirements and the implementation in `example/full-config.ts`.
4.  **Verification**: 
    *   Verified the fix with existing unit tests in `src/transport/ws/validation.test.ts`.
    *   Resolved an issue where Prettier-induced blank lines broke the `check-doc-blocks.mjs` script.
    *   Confirmed that `npm run docs:fix` and spec anchor repointing scripts pass without findings.

I did not write any new tests as the existing unit tests already covered the logic I refactored and all facets in `dod.md` were already ticked. The round focused on resolving CI failures and completing documentation tasks left from the previous round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix ESLint errors and complete documentation","tdd_next":"acceptance green"}}