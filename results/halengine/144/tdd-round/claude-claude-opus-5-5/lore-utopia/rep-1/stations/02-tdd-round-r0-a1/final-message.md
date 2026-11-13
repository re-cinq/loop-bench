I closed the third facet in `.lore/dod.md`: `createMessageHandler` now takes the session store, `createServer` passes it in, and a `list_sessions` frame gets a `session_list` reply. The commit is pushed, `origin/main` was already merged in, and the branch is level with its upstream.

**Test:** I added one test, "answers from the store it was given, for the session user and not the frame, with ISO dates", at `src/transport/ws/messageHandler.test.ts:873`. It failed first because nothing was sent, then passed. All 55 tests in that file pass, and so do the 13 in `sessionSave.test.ts` and `beforeToolCall.test.ts`, the other two files that call `createMessageHandler`. I did not run the acceptance tests; CI will.

**Code changes:**
- `messageHandler.ts`: the handler takes an optional `sessionStore` second argument, so existing callers that pass only the orchestrator still work. A `list_sessions` frame is answered alongside `ping`, outside the per-session lock. `listFor` is called with `session.userId` and `{limit, before}`, never with a user id from the frame.
- `sender.ts`: a new `sendSessionList` sends `createdAt` and `updatedAt` as ISO strings.
- `createServer.ts`: passes its `sessionStore` to the handler.
- `specs/hal-engine-conversation-list/spec.md`: one new statement with its `([validated by: …](…#L873))` link. This repo has no `scripts/spec-links/reanchor.mjs`; I checked the existing links in that spec and none moved.

**Next round:** when `listFor` throws or rejects, log under `ws` with the `userId` and the error, and send `SERVER_ERROR`. A store with no `listFor` already gets an empty `session_list` (from the `?? []` fallback).

**Red tests:** the round brief had no CI section, so there was no CI verdict to work from. This round's own test was the only red one, and it is now green; I found no regressions.

**Things I noticed but did not touch:**
- The lore graph records no covering tests for `messageHandler.ts`, although three test files exercise it.
- `.lore/dod.md` follows a different design from the ticket. It names the frames `list_sessions`/`session_list` and answers a store without `listFor` with an empty list. The ticket names them `list_conversations`/`conversation_list` and asks for an `UNSUPPORTED` error there, behind a `transport.history` opt-in. The acceptance tests match `dod.md`, so I followed it, but someone should reconcile the two.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler (optional) and wire it in createServer","tdd_next":"Handle list_sessions errors in messageHandler: log via log.error('ws', ...) with userId and error, answer ErrorCodes.SERVER_ERROR"}}