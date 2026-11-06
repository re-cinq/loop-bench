I closed the last open facet in `.lore/dod.md`, which was documenting `list_sessions` and `session_list` in the specs. The branch is pushed, already up to date with `origin/main`, and not ahead of its upstream.

**What I changed**
- **Test:** `src/transport/ws/messageHandler.test.ts:153` checks that a store with no `listFor` gets an empty `session_list` and no `error` frame. It passed on its first run because earlier rounds had already built this. To make sure it can fail, I briefly removed the empty-list fallback in `messageHandler.ts`; the test went red, and I restored the code.
- **Spec:** `specs/hal-engine-websocket-protocol/spec.md` gains a sentence in § 4.3 citing that test, and a new § 5.9 `session_list` with field tables for the frame and its rows. § 5.9 says the frame carries only one user's conversation metadata and no content, and that the user comes from the connection, never the frame. The conversation-list spec already had its section on the protocol.
- **Links:** the new test pushed later tests down 10 lines, so I updated the `messageHandler.test.ts#Lnn` links in seven specs by hand (this repo has no reanchor script). `check:spec-links`, `spec:names` and `check:spec-status` all pass.
- **Not run:** the acceptance tests, lint and the typechecker; CI judges those.

**CI**
The round brief is the verdict on `b72457c`. The next commit, `46e6389`, already fixed its test failure, the changelog check and every lint finding outside the acceptance test. None of the red tests were regressions, and none came from this round's test.

**Still open**
- **Lint stays red on one line I can't touch:** `re-lint/prefer-early-return` fires at `src/transport/conversationList.acceptance.test.ts:67`, inside the acceptance test, which a round may not edit. The test's author needs to flatten that `if`.
- **The acceptance tests contradict the ticket.** The ticket asks for `list_conversations` / `conversation_list` frames, an `UNSUPPORTED` error when `listFor` is missing, and an opt-in `transport.history` flag. The acceptance tests in `.lore/dod.md` instead define `list_sessions` / `session_list`, an empty list when `listFor` is missing, and no opt-in flag. I followed the acceptance tests, but someone should reconcile the two before review.

**Smells noticed, not acted on:** each `list_sessions` test in `messageHandler.test.ts` builds the same `sent`/`ws` capture stub.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md","tdd_next":"acceptance green"}}