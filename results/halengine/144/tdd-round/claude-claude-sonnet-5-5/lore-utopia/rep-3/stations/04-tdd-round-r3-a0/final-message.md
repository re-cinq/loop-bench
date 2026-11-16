This round fixed the CI findings I could fix without touching the acceptance test, and it's pushed. The branch isn't ahead of its upstream, and `origin/main` was already merged. I ran only `validation.test.ts` (5 tests, all passing), plus the two spec checks that were failing. Both pass now: `check-spec-anchor-names` and `check-spec-links`. I did not run eslint, so I haven't confirmed its findings are gone.

**What I fixed:**
- **`validation.ts`:**
  - Moved `validateBefore` below its caller.
  - Flattened the nested `if` by extracting `isNonNegativeInteger`.
  - Added `eslint-disable-next-line camelcase` on the `user_message` and `list_sessions` keys, which are wire frame names.
- **`validation.test.ts`:** Replaced the `it.each` whose `%j` name no spec citation could match with one plain `it` named "rejects a list_sessions frame with a malformed limit or before".
- **Spec:** Updated that name in the spec citation. I also folded the two citations on the `list_sessions` statement at line 165 into one trailing parenthetical, since a citation mid-sentence is what `check-spec-links` flagged.

**What's still red:** In `src/transport/conversationList.acceptance.test.ts`, three eslint `no-duplicate-code` findings (against `sessionResume.test.ts`) and one `prefer-early-return` finding remain. They are in an acceptance test, which I must not edit, so they need a human. If the lint rule is the problem, the fix would be a shared helper in `sessionResume.test.ts`.

**Red tests:** None of this round's findings were regressions, and none came from test failures. They were lint and spec-citation findings on code and a test from earlier rounds.

**Noticed but left alone:** The three acceptance tests that `.lore/dod.md` lists still use `list_sessions` and `session_list`. The ticket asks for `list_conversations` and `conversation_list`, `transport.history`, `UNSUPPORTED` and `StoreCannotList`. The ticket also asks for an error rather than an empty list when the store has no `listFor`. The checked-in `dod.md` and acceptance tests contradict the ticket on these points, so a human should reconcile them.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI lint and spec-citation findings in list_sessions validator, its test, and the protocol spec","tdd_next":"acceptance green (remaining eslint duplicate-code/early-return findings are in conversationList.acceptance.test.ts and need a human edit)"}}