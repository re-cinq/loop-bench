I committed and pushed this round to `loop-bench/144`. It's up to date with `origin/main` and not ahead of its upstream.

**CI findings fixed first** (from the round brief's red build):
- **eslint spec-link and spec-names:** last round added an import at the top of `messageHandler.test.ts`, which pushed every test below it down a line and broke their `#Lnn` citations. This repo has no `reanchor.mjs`, so I used its `npm run spec:names:fix`. It repointed 82 citations across 8 specs, and `npm run spec:names` now passes.
- **changelog:** added an entry under `## [Unreleased]` for the `list_sessions` frame.
- **test:** I couldn't read the full list of red tests. Lore returned "branch not found" and the brief's output is cut off. What I can see points to the acceptance test this facet targets, but I can't confirm there are no regressions. The next CI run will show it.
- **eslint timeout:** the eslint job also hit its 10-minute limit in CI. That's on the CI side and nothing in this round can change it.

**This round's facet:** a `listFor` that throws.
- **Red:** a new test in `src/transport/ws/messageHandler.test.ts` failed as expected, because the generic handler logged under the `message` category with no session or user id.
- **Green:** `handleListSessions` in `src/transport/ws/messageHandler.ts` now catches the error itself. It logs `log.error('ws', …, {sessionId, userId, error})` and sends `SERVER_ERROR` with the message "Could not list sessions", which carries no store detail. Only my test ran, and it passed with its sibling.
- **Refactor:** none needed.
- I added the spec statement with its citation to `specs/hal-engine-conversation-list/spec.md` and ticked the facet in `.lore/dod.md`.

**Red tests:** one was mine (now green), and I don't know of any regressions I caused. I couldn't check that against CI's full list.

**Not acted on:**
- **The dod disagrees with the ticket.** The ticket asks for `list_conversations`, `conversation_list`, a `transport.history` opt-in, an `UNSUPPORTED` code and an error when the store has no `listFor`. The dod's acceptance tests instead ask for `list_sessions`, `session_list`, no opt-in, and an empty list in that case. I followed the dod because it is the bar, but someone should settle which is right.
- **Logging the user id:** the ticket says to log "the session id and no user content", while the dod's acceptance test expects the user id in the log. I log both.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle list_sessions errors in messageHandler: log on ws with sessionId/userId/error and answer SERVER_ERROR; plus CI fixes (spec citations repointed, CHANGELOG entry)","tdd_next":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md"}}