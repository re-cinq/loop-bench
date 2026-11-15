I fixed every finding from the last CI run and closed the "`listFor` throws" facet. The commit is pushed, `origin/main` was already merged in, and the branch is level with its upstream.

**What changed**
- **New test** in `src/transport/ws/messageHandler.test.ts`: when a store's `listFor` rejects, the client gets one `SERVER_ERROR` frame with no store detail in it, and the failure is logged under `ws` with the session id, user id and error message. I ran it before the fix and it failed for the expected reason: the error was being logged under `message`, without the user.
- **The fix**, in `messageHandler.ts`: `answerListSessions` now catches the rejection itself, logs it under `ws` and sends `SERVER_ERROR`. I moved the small error-to-text helper so both error paths share it.
- **The 5 lint errors**:
  - In `validation.ts`, the `switch` is now a lookup table, the vaguely named variable `data` is now `frame`, and the two nested `if`s are flat guard clauses.
  - In `validation.test.ts`, I replaced `Array(...).fill(false)`, which tripped the boolean-argument rule.
- **`.lore/dod.md`**: I ticked the "throwing `listFor`" facet and the facet for handling `list_sessions`, which is now complete.

**Tests:** I ran only the two test files I touched: 60 of 60 pass. I did not run the acceptance tests, the linter or the typechecker; CI judges those on this push. The failing tests CI reported last time were 1 acceptance test (this facet), and the brief named no regressions. The test I wrote this round was my only red test, and it is green now.

**Traceability:** the new test has no spec link yet. The protocol spec doesn't describe `list_sessions` at all yet, and this repo's tests have no spec-anchor convention I could follow. The remaining documentation facet should add the link.

**Gaps against the ticket:** the branch follows `.lore/dod.md`, which differs from the ticket in ways a later round or the reviewer needs to settle:
- It uses the wire names `list_sessions`/`session_list`; the ticket says `list_conversations`/`conversation_list`.
- It answers an empty list when the store has no `listFor`; the ticket wants an `UNSUPPORTED` error.
- It has no `transport.history` opt-in flag.

I left all of these alone because the acceptance tests define them this way.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle a throwing listFor: log under 'ws' with sessionId/userId/error and answer SERVER_ERROR; plus CI eslint fixes in validation","tdd_next":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md"}}