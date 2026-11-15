I finished one round and pushed it. The branch is in sync with `origin/loop-bench/144` and already up to date with `origin/main`.

**What CI flagged on the last push:**
- **spec-names:** fixed. Three citations to the acceptance tests pointed at the wrong lines, and I repointed them. That also clears the eslint `require-spec-link` finding at line 163 of the acceptance test. My new test then shifted the tests below it, so I repointed another 79 citations across 8 specs. `spec:names` now reports no findings.
- **changelog:** fixed. There's a new entry under `## [Unreleased]` → Added, written for someone installing the package.
- **eslint, not fixed:** the remaining findings are in the acceptance test file itself (`src/transport/conversationList.acceptance.test.ts`). Lines 23, 33 and 80 duplicate code in `src/transport/sessionResume.test.ts`, and line 67 trips the early-return rule. Fixing them means editing the acceptance test, which a round may not do, so the ticket owner needs to decide. I added this as an unchecked facet in `.lore/dod.md`. The brief's eslint output was cut off, so there may be more findings I couldn't see.
- **test:** red because the acceptance tests are still red, which is expected mid-ticket.

**The round itself:**
- **Red:** I added one test to `src/transport/ws/messageHandler.test.ts`: "answers list_sessions from the store for the session user with ISO dates, outside any turn". It failed because nothing was sent and the store was never asked.
- **Green:** a valid `list_sessions` frame is now answered with one `session_list` frame:
  - It asks `listFor` for the connection's own user, never a user named in the frame, passing the frame's `limit` and `before`.
  - Both dates go out as ISO strings, and a store without `listFor` gets an empty list.
  - It's answered without waiting behind a streaming reply.
  - `createServer` now passes the session store to `createMessageHandler`, and the two new reply types are added to `messages.ts`.
- **Refactor:** I exported the three frame types from `src/index.ts` and added the statement to the protocol spec §4.3, linked to the new test.

**Tests run here:** only `messageHandler.test.ts`, by file: all 55 pass. I didn't run lint or the typechecker; CI will.

**Red tests:** none of mine and no regressions — the last CI verdict named no red test outside the acceptance list.

**Next facet:** when `listFor` throws, the handler must log under the `'ws'` category with the user id and error and answer `SERVER_ERROR`. Today the shared error handler catches it, sends `SERVER_ERROR`, but logs under `'message'`.

**Not acted on:**
- The ticket and `.lore/dod.md` disagree on several points. The ticket uses `list_conversations` and `UNSUPPORTED`, and says a store without `listFor` gets an error. The dod and acceptance tests use `list_sessions` and want an empty list. I followed the acceptance tests.
- Prettier reports style issues in `specs/hal-engine-websocket-protocol/spec.md`. CI's formatter check only covers `src`, `scripts` and `smoke`, so I left it alone.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler and answer list_sessions with session_list (ISO dates, session.userId, [] without listFor)","tdd_next":"A throwing listFor logs via log.error('ws', ..., {userId, error}) and answers SERVER_ERROR"}}