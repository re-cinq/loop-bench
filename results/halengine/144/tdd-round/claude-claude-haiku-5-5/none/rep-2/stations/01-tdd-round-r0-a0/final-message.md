Round complete: one facet closed and pushed to `loop-bench/144`. The branch is not ahead of its upstream, and the merge with `origin/main` was already up to date.

**What I did (one facet: a bare `list_sessions` frame is accepted)**
- **RED:** wrote one test in `src/transport/ws/validation.test.ts`, "accepts a bare list_sessions frame". I ran it, and it failed for the expected reason: `Unknown message type: list_sessions`.
- **GREEN:** added a `list_sessions` case to `validateMessage` in `src/transport/ws/validation.ts`, and a `ListSessionsMessage` interface in `src/types/messages.ts` so the return value is typed. The file's four tests pass.
- **REFACTOR:** nothing worth changing yet. The new case is a single literal return.
- **Formatting:** ran prettier on the three changed files; they were already formatted.
- **Tracking:** `.lore/dod.md` now ticks the bare-frame sub-facet and adds open sub-facets for the rejection rules and for stripping `userId`. The facet "Validate list_sessions frames" stays unticked because only part of it is done.
- Committed with the Haiku co-author line and pushed.

**Not done this round**
- The round ran no CI and no acceptance tests here. The round brief did not exist, and I did not check CI with `lore_get_ci_failures`. The lore tools were not reachable from this session, so I could not query the trace graph for tests covering `messages.ts` or `validation.ts` before editing.
- The round ran no tests beyond `validation.test.ts`.
- My own red tests this round: 0. Regressions: none known, since I ran only the one file.
- Nothing was run for lint, typecheck or build, per the pod rules.

**Things to know**
- The ticket names the frames `list_conversations` and `conversation_list`. The acceptance tests and `dod.md` use `list_sessions` and `session_list`. I followed the acceptance tests, since they define done. This needs a decision before the ticket's spec and changelog work.
- `answerFrame` in `messageHandler.ts` silently ignores any valid non-ping frame. Until the handler is wired for `list_sessions`, a valid frame of that type gets no answer at all. That is a near-term hazard for the next round, not an unrelated smell.

**Next round:** reject malformed `limit` and `before` with `INVALID_MESSAGE` in the validator.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions: accept a bare frame","tdd_next":"Validate list_sessions: reject malformed limit/before with INVALID_MESSAGE"}}