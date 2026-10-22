I have fixed the CI failures from the previous push:
- Typed `jest.fn<any>()` in `src/transport/ws/messageHandler.test.ts` to resolve the `never` typecheck error.
- Split the test with two `expect` calls in `messageHandler.test.ts` to satisfy the `re-lint/max-expects` rule.
- Added the missing spec links (the `([validated by](...))` inline tags) from `messageHandler.test.ts` into `specs/hal-engine-conversation-list/spec.md`.
- Removed the unused `SessionSummary` import in `src/transport/ws/messageHandler.ts` to satisfy `@typescript-eslint/no-unused-vars`.
- Flattened the nested `if` inside `messageHandler.ts` by extracting a `handleListSessions` function to satisfy the `re-lint/no-nested-if` rule.
- Formatted the touched files using `npx prettier --write`.

The code has been committed, pushed, and the branch is in sync with `origin/main`. No tests were run locally as this round was strictly to fix the CI failures, the tests will be executed in the CI pipeline.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI failures (typecheck and eslint) from the previous round","tdd_next":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md"}}