The round is pushed. The new handler test passes, but I ran none of the three acceptance tests, so they're unconfirmed. This pod doesn't run them; CI judges the push.

**What I did**
- **Test:** I wrote `src/transport/ws/listSessions.test.ts`. It checks that a `list_sessions` frame is answered from the connection's own `userId`, ignoring a client-supplied `u2`. It also checks that the reply is one `session_list` frame with ISO-string dates. I ran it by file and it passes.
- **Code:**
  - `SessionSummaryFrame` and `SessionListMessage` are added to `OutgoingMessage` and exported from `src/index.ts` and `src/types/index.ts`.
  - `createMessageHandler` takes an optional `sessionStore`, and `createServer` passes it in.
  - `list_sessions` is handled on the non-locked path beside `ping`. A store without `listFor` gets an empty list. A failing `listFor` logs under `ws` with the `userId` and error message, and the client gets `SERVER_ERROR`.
- **Housekeeping:** I ticked the three facets in `.lore/dod.md` and added a spec statement with a citation to the protocol spec. I ran prettier on the changed files. `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I checked the link line by hand; the test is on line 9, as cited.
- **Branch state:** merging `origin/main` brought nothing new, and the branch is not ahead of its upstream.

**Red tests:** none of my own were red. The earlier CI failures were the acceptance tests failing for missing behaviour, which this round addresses. I introduced no regressions that I know of, but I didn't check the covering-tests graph and CI hasn't reported yet.

**Not done**
- The spec-link and lint errors CI listed on `validation.ts` are not fixed. They are `prefer-polymorphism`, `no-nested-if` and `no-vague-names`. Beyond the last round's repairs, I made no further lint changes.
- `.lore/dod.md` still lists "document `list_sessions` and `session_list` in both specs" as open. I only added one statement to the protocol spec.

**Things I noticed:** `.lore/dod.md` follows the `list_sessions` / `session_list` naming, while the ticket describes `list_conversations` / `conversation_list`. I followed `dod.md`, since the acceptance tests use it. The ticket's opt-in `history` flag and `UNSUPPORTED` error code aren't implemented.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"thread sessionStore into createMessageHandler/createServer and handle list_sessions with session_list reply","tdd_next":"remaining lint findings in validation.ts, plus both spec documents for list_sessions/session_list"}}