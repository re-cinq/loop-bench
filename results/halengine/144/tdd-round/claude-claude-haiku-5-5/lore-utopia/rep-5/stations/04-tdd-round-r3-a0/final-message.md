This round closed the `before` facet and cleared the unit-test and validator lint findings from the last CI run. One CI finding is still open: the acceptance test file's lint errors, which I did not touch.

**What I did**
- **Red:** added a unit test that a `list_sessions` `before` with a bad `updatedAt` must be refused with an error naming `before`. It failed as expected.
- **Green:** `validateListSessionsMessage` now refuses a `before` unless it has a `sessionId` of 1–128 characters and an `updatedAt` that `Date.parse` accepts. It also strips the cursor to those two fields, so `userId` and other extras do not pass through.
- **Refactor:** the `switch` on `message.type` became a `Map` of validators. This clears the `prefer-polymorphism` finding.
- **CI findings in my own unit test:** merged the two-expect limit test into one `toMatchObject`, which clears `max-expects`. Added four statements to `specs/hal-engine-conversation-list/spec.md` citing each unit test, which clears the three `require-spec-link` errors.
- **Facets:** ticked the `before` facet in `.lore/dod.md`.
- **Format and delivery:** ran prettier on the two TypeScript files. Committed, pushed, merged `origin/main` (already up to date), and `git status` shows the branch is not ahead of its upstream.

**Not done, and why**
- `src/transport/conversationList.acceptance.test.ts` lines 59:9 has two lint errors (nested `if`, no-else). The fix means restructuring a helper inside an acceptance test, and the rules say not to edit acceptance tests, so I left it. It needs a decision on whether a lint-only restructuring is allowed. Until then the eslint job stays red.
- The acceptance tests are still red, as expected mid-ticket. I did not run them.
- The websocket protocol spec does not document `list_sessions` or `session_list` yet. That facet stays open.
- I did not change the conversation-list spec's `Status` row, which still says `Shipped`.

**Test runs:** I ran only `src/transport/ws/validation.test.ts`, with the repo's `node --experimental-vm-modules` jest invocation. It went red then green, 7 of 7 passing at the end. No other tests ran here.

**Red tests:** of the CI-reported red tests, zero are mine. The two lint errors are in the acceptance file, which is not mine to edit. Regressions caused by this branch: none known.

**Next facet:** thread `sessionStore` into `createMessageHandler`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject a malformed list_sessions before in validation.ts","tdd_next":"Thread sessionStore into createMessageHandler and wire it in createServer.ts"}}