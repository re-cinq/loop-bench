This round closed the "strip userId" facet, fixed the one lint finding in my own code, and pushed. The branch is in sync with `origin/loop-bench/144`, and the merge with `origin/main` was a no-op.

**What changed**
- `validation.ts`: renamed `data` to `listFrame` to clear the `re-lint/no-vague-names` finding at line 76.
- `validation.test.ts`: added a test that a `list_sessions` frame carrying `userId` and an unknown field comes back with only `type`, `limit` and `before`.
- `specs/hal-engine-websocket-protocol/spec.md`: the inserted test shifted three `#Lnn` links. There is no reanchor script in this repo, so I re-pointed them by hand (L38→L44, L45→L51, L51→L57) and checked each target line.
- `.lore/dod.md`: ticked the strip facet.

**The red phase did not go red.** The new test passed on its first run. The validator already builds a fresh frame from only the fields it knows, so the behaviour was there before the test. I kept the test as a regression guard, but this facet was not closed by TDD.

**Tests:** I ran only `src/transport/ws/validation.test.ts` (9/9 green). I did not run the acceptance tests, per the brief. Per the CI verdict in the brief, `conversationList.acceptance.test.ts` is red in the `test` step. That red is in acceptance tests, not in tests I wrote this round. Regressions: none were named in the verdict. Red tests I wrote this round: 0 (the one test I added passes).

**Not fixed, left for the next round:**
- `eslint` duplicate-code and `prefer-early-return` findings in `conversationList.acceptance.test.ts`. I did not edit an acceptance test to clear lint.
- `eslint` duplicate-code findings in `sessionResume.test.ts`, which the acceptance file duplicates. Clearing them means editing an existing test file that is not mine.
- The `test` failure "answers an empty session_list when the store has no listFor". The ticket says that case must be an `error` frame, not an empty list. The acceptance test and the ticket disagree, so the acceptance test may be wrong. I did not edit it. Someone should decide which is right.

**Remaining facets:** thread `sessionStore` into `createMessageHandler` and `createServer`; handle `list_sessions` in `messageHandler.ts`; document the frames in the conversation-list spec.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"strip userId and unknown fields from the parsed list_sessions frame","tdd_next":"thread sessionStore into createMessageHandler and createServer"}}