Round 1 of #144 is committed and pushed, and the branch is level with its upstream. The merge with `origin/main` produced nothing new.

**What this round did (TDD, facet: bare `list_sessions` frame)**
- **Red:** added one unit test to `src/transport/ws/validation.test.ts`. It sends `{type: 'list_sessions', userId: 'u2'}` and expects a valid frame with the `userId` dropped. It failed with `Unknown message type: list_sessions`.
- **Green:** added `ListSessionsMessage` to `IncomingMessage` in `src/types/messages.ts` and a `list_sessions` case in `validation.ts`. The test file passed 4/4.
- **Refactor:** nothing to change.
- **Format:** ran prettier on the three touched files; they were already clean.
- **`.lore/dod.md`:** ticked the bare-frame facet. Added a new unchecked facet for `limit`/`before` validation, which is the next round's work.

**Choices I made**
- The ticket names `list_conversations` / `conversation_list`, but the acceptance tests and `dod.md` use `list_sessions` / `session_list`. I followed the acceptance tests, since they define done.
- Facet 1 (the outgoing types, the `index.ts` re-export, and the spec updates) is still open. I added only the incoming type, because the validator's return type needs it.

**Not done**
- I did not run the acceptance tests. `conversationList.acceptance.test.ts` is CI's to run.
- No `round-brief.md` was present, so there was no CI verdict to act on.
- I ran Jest on the single file, not vitest as the prompt's example shows. `test-commands.yml` and `package.json` both say Jest.
- The next round needs the `limit`/`before` validation: integer `limit` ≥ 0 and a `before` object with a 1–128 char `sessionId` and a finite-date `updatedAt`.

**Tests:** this round ran one red-then-green unit test, 1 red test written and turned green. Regressions: none observed locally. CI is the judge of the acceptance tests and the full suite.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"bare list_sessions frame accepted by validateMessage, userId stripped","tdd_next":"validate list_sessions limit and before in validation.ts, rejecting malformed values with INVALID_MESSAGE"}}