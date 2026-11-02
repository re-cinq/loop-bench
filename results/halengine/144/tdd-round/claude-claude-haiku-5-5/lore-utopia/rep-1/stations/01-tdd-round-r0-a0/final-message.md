This round closed one facet: a bare `list_sessions` frame is now accepted by the WebSocket validator. The commit `95df00e` is pushed to `loop-bench/144`, and the branch is up to date with its upstream. `origin/main` was already contained, so the merge was a no-op.

**What I did (one red-green-refactor round)**
- **Red:** added a unit test to `src/transport/ws/validation.test.ts` asserting `{type: 'list_sessions'}` validates to `{valid: true, data: {type: 'list_sessions'}}`. It failed with `Unknown message type: list_sessions`.
- **Green:** added `ListSessionsMessage` to `src/types/messages.ts` and a `list_sessions` case in `src/transport/ws/validation.ts`. The test file then passed 4/4.
- **Refactor:** nothing to clean up at this size.
- **Dod:** I split facet 2 rather than ticking it whole. The bare-frame part is ticked. `limit`/`before` validation is a new open facet, and the `messages.ts` types (`SessionSummaryFrame`, `SessionListMessage`, index re-export) are another open facet.

**Test runs**
- Ran only my new test's file, `validation.test.ts`, via Jest with `--experimental-vm-modules`. Red then green.
- I did not run the acceptance file `conversationList.acceptance.test.ts`, the full suite, lint, typecheck, or any build.
- Prettier was run on the changed files before commit.

**Test counts**
- Red tests from CI: none known. `lore_get_ci_failures` returned 404 "branch not found" for `loop-bench/144`, and there is no round brief, so there is no CI verdict to read yet.
- Regressions I caused: none known, for the same reason. The lore graph reports no tests covering `validation.ts` on main.

**Things to know**
- The ticket names the frame `list_conversations` and `conversation_list`. The acceptance tests and `dod.md` use `list_sessions` and `session_list`. I followed the acceptance tests, since they are the bar. The naming mismatch is unresolved and affects the next round.
- The ticket's acceptance criteria and the dod facets describe overlapping but different scopes. I did not reconcile them.
- Unrelated smells noticed and not acted on: none worth naming beyond the naming mismatch above.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validation: bare list_sessions frame accepted","tdd_next":"validate list_sessions limit and before, answering INVALID_MESSAGE"}}