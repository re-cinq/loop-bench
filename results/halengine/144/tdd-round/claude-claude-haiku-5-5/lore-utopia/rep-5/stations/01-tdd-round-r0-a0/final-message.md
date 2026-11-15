Round 1 is pushed. I closed the bare `list_sessions` validation facet, and the branch is in sync with its upstream.

**What changed**
- `src/types/messages.ts`: added `ConversationCursor` and `ListSessionsMessage` (`limit?`, `before?`) and put the message into `IncomingMessage`. The change is additive.
- `src/transport/ws/validation.ts`: a `list_sessions` case returns `{valid: true, data: {type: 'list_sessions'}}`.
- `src/transport/ws/validation.test.ts`: one new test, written red first. It failed with "Unknown message type: list_sessions", then went green with the change above.
- `.lore/dod.md`: facet 2 is split. The bare-frame part is ticked; `limit`/`before` validation is a new unchecked facet. Facet 1 (the other types and the `src/index.ts` re-export) is still open.

**Verification**
- I ran only `validation.test.ts` with the repo's Jest entry point (`node --experimental-vm-modules node_modules/jest/bin/jest.js <file>`). Result: 4 of 4 passing after the red step.
- The acceptance tests in `conversationList.acceptance.test.ts` were not run, as the brief requires. No CI brief existed at the start of this round, so there was no CI verdict to act on.
- Prettier ran on the three changed source files, and they were already formatted. Lint and typecheck were not run.
- The refactor step found nothing worth changing.

**Things to know**
- The ticket says `list_conversations` / `conversation_list`, but the acceptance tests and dod use `list_sessions` / `session_list`. I followed the tests. The ticket's wording should be reconciled before the spec is written.
- `lore-query-trace` reported no covering tests for `validation.ts` or `messageHandler.ts`. Both have unit test files in the repo, so the graph is stale. I did not rely on it.
- No spec statement was added this round, so no traceability links or spec status changed.
- Regression count: 0 red tests were mine to fix, and I know of no regressions. CI has not reported on this push.

**Not done in this round (left for the next)**
- `limit` and `before` validation with `INVALID_MESSAGE`, and stripping of `userId`.
- Facet 1's remaining types and the `src/index.ts` re-export.
- The handler, server wiring, the error codes, and the spec and docs.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate a bare list_sessions frame in validation.ts","tdd_next":"Validate list_sessions limit and before in validation.ts"}}