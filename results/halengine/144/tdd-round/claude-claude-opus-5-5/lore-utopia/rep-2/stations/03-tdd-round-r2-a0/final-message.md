I closed the failing-`listFor` facet, fixed both lint findings CI reported, and pushed. `loop-bench/144` is level with its upstream and already up to date with `origin/main`.

**CI findings from the last push:**
- `src/transport/ws/validation.ts:30` (`prefer-polymorphism`): the three-way `switch` on `message.type` is now a lookup table of validators.
- `src/transport/ws/validation.test.ts:48` (`no-flag-params`): the test now keeps the malformed frames the validator accepted and expects that list to be empty, instead of comparing against `Array(n).fill(false)`.
- The red `test` job was the acceptance test "answers an empty session_list when the store has no listFor, and SERVER_ERROR with a ws error log when listFor throws". That is the facet I closed this round, not a regression.

**The round:**
- **Red:** a new test in `src/transport/ws/messageHandler.test.ts` gives the handler a store whose `listFor` rejects. It failed for the expected reason: the error was logged under `message`, with no session or user id.
- **Green:** `answerListSessions` now catches the error itself. It logs `log.error('ws', …, {sessionId, userId, error})` and sends `SERVER_ERROR` with a generic message that carries nothing from the store.
- **Refactor:** the error-message extraction moved into a shared `errorMessage()` helper, also used by `wsErrorHandler`.
- **Tests run:** only `messageHandler.test.ts` and `validation.test.ts`; all 61 pass. I did not run the acceptance tests; CI will.
- **Docs:** § 5.9 of the protocol spec has a new statement for this error path, linked to the new test. `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I used `check-spec-anchor-names.mjs --fix` instead. It moved 81 links, all pointing into `messageHandler.test.ts`. I ticked the facet in `.lore/dod.md`.

**Red tests:** one was mine (written and now green), and there were no regressions.

**Other things I noticed, none acted on:**
- **The ticket and the acceptance tests disagree.** The ticket asks for `list_conversations`/`conversation_list`, a `transport.history` opt-in, and an `UNSUPPORTED` error code when a store has no `listFor`. `.lore/dod.md` and the acceptance tests use `list_sessions`/`session_list`, have no opt-in, and expect an empty list in that case. I followed the acceptance tests, but someone should reconcile the two before review.
- The acceptance test's CI log shows "Cannot log after tests are done", from `connectionHandler`'s disconnect log firing after teardown.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"listFor failure: log.error('ws') with sessionId/userId and answer SERVER_ERROR (plus CI lint fixes)","tdd_next":"Finish the docs: list_sessions/session_list frames in specs/hal-engine-conversation-list/spec.md"}}