This round closed the facet for a failing `listFor` and fixed most of CI's findings. It's committed and pushed to `loop-bench/144`, which already includes `origin/main`, and `git status` shows nothing unpushed. One CI lint error can't be fixed by a round, because it is inside the acceptance test.

**The round**
- **Red:** I added a test to `src/transport/ws/messageHandler.test.ts`, "answers a rejecting listFor with SERVER_ERROR and logs it on the ws category…". It failed because the error was logged under the `message` category with no user id.
- **Green:** in `src/transport/ws/messageHandler.ts`, a failing `listFor` is now logged on the `ws` category with the session id, the user id and the error text. The client gets a `SERVER_ERROR` frame that contains none of the store's details. This is what made the acceptance test's "SERVER_ERROR with a ws error log" case fail on the last build.
- **Refactor and CI findings:**
  - All four lint errors in `src/transport/ws/validation.ts` are fixed: the switch is now a lookup table, `data` is renamed, and the nested ifs are flattened.
  - The six duplicated-code errors are fixed from the `sessionResume.test.ts` side. Its shared helpers moved into `wsTestSupport.ts` as `eventually`, `stopWhenDrained` and `requiredMembersOf`, so the acceptance test no longer duplicates anything.
- **Spec:** the protocol spec now has a statement for this behaviour that cites the new test. Adding an import to the test file shifted its line numbers, so I updated the shifted links in the specs with `scripts/repoint-spec-anchors.mjs`; the spec-link check and the anchor check both come back clean.

**Tests:** only the files I touched were run here: `messageHandler.test.ts`, `validation.test.ts` and `sessionResume.test.ts` all pass. Of CI's red results, the one failing test was the acceptance test; it was red because of this facet, not because I broke an existing test (0 regressions).

**Still open:**
- **Lint error inside the acceptance test:** CI flags `prefer-early-return` at `src/transport/conversationList.acceptance.test.ts:67`. Rounds may not edit acceptance tests, so the eslint check will stay red until the ticket owner decides what to do. It's recorded in `.lore/dod.md`.
- **The ticket and `.lore/dod.md` disagree.** The ticket specifies `list_conversations` / `conversation_list`, `UNSUPPORTED` errors and a `transport.history` opt-in. The dod and its acceptance tests use `list_sessions` / `session_list` and answer an empty list when the store has no `listFor`, which the ticket rules out. I followed the dod, but the ticket owner should know about it.

**Next:** the last open facet is the §5 field table for `session_list` in the protocol spec.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"A rejecting listFor is logged via log.error('ws', …, {sessionId, userId, error}) and answered SERVER_ERROR; CI lint on validation.ts and helper duplication cleared","tdd_next":"Add the §5 session_list field table to specs/hal-engine-websocket-protocol/spec.md"}}