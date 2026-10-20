Fixed the ESLint errors in `src/orchestration/orchestratorTestSupport.ts` and `src/types/ai.ts` that were identified in the previous round's CI report.

- In `src/orchestration/orchestratorTestSupport.ts`, I condensed the multi-line comment on the `scriptedProvider` function to a single line to satisfy the `re-lint/max-comment-lines` rule.
- In `src/types/ai.ts`, I converted the `TurnUsage` interface to a type alias to satisfy the `@typescript-eslint/no-empty-object-type` rule, while maintaining the deliberately named contract requested by the ticket.

The changes were formatted with Prettier and pushed to the repository. The branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix ESLint errors in orchestratorTestSupport and ai.ts","tdd_next":"acceptance green"}}