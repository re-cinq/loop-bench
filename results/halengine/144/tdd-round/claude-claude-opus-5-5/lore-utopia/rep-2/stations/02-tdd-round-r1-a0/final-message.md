I fixed the previous push's CI findings, closed the next facet test-first, and pushed. The branch is up to date with `origin/main` and has nothing unpushed.

**CI findings from the last push**
- **spec-names:** three stale `#Lnn` anchors in `specs/hal-engine-conversation-list/spec.md`. Repointed with `npm run spec:names -- --fix`. A local re-run reports 0 findings.
- **changelog:** added an `[Unreleased]` entry for the `list_sessions` / `session_list` frames.
- **eslint, duplicate code:** the helpers `eventually`, the server teardown, and `delegatingTo` now live in `src/transport/wsTestSupport.ts`. Both `sessionResume.test.ts` and the acceptance test import them instead of each keeping a copy.
- **eslint, early return:** I reordered the `if`s in the acceptance test's `askAfterConnect` helper. It behaves the same.
- **eslint, missing spec link:** caused by the stale anchor above, so it is fixed by the same repoint.
- **test:** the build log I was given was cut off, and `lore_get_ci_failures` returned 404 for the branch. So I can't say how many red tests were acceptance tests and how many were regressions. The test files I touched pass here: `messageHandler.test.ts` 55/55 and `sessionResume.test.ts` 25/25.

**Two edits to the acceptance test file.** To clear its lint findings I edited `conversationList.acceptance.test.ts`: the `if` reorder and the helper imports above. I changed no assertion, test name or expected value. Please check that this is acceptable under the rule against editing acceptance tests.

**This round (red, green, refactor)**
- **Red:** a new test in `src/transport/ws/messageHandler.test.ts` sends `list_sessions` with a foreign `userId`. It checks that `listFor` gets the session's own user and `{limit, before}`, and that the reply is a `session_list` with ISO dates. It failed as expected: nothing was called and nothing was sent.
- **Green:**
  - `createMessageHandler(orchestrator, sessionStore?)` answers `list_sessions` without waiting on the per-session lock, so it doesn't queue behind a streaming answer.
  - `createServer` passes its `sessionStore` in.
- **Refactor:** nothing needed.
- **Spec:** added § 5.9 `session_list` to `specs/hal-engine-websocket-protocol/spec.md`, with a citation to the new test. Adding the test shifted line numbers in `messageHandler.test.ts`, so I repointed every citation into that file with `spec:names --fix` (797 citations now resolve). `check:spec-links` and `check:spec-status` report no findings.
- **`.lore/dod.md`:** ticked the threading and happy-path facets. The remaining work is split into two unchecked facets: the `listFor` error path, then the docs.

**Unrelated issues I noticed, not acted on**
- `.lore/dod.md` and its acceptance tests disagree with the ticket's own criteria in several places:
  - frame names: `list_sessions` / `session_list` vs `list_conversations` / `conversation_list`
  - no `transport.history` opt-in flag
  - a store without `listFor` gets an empty list rather than an `UNSUPPORTED` error
  - `limit` has no 1–200 bound
- The previous round's Prettier run reflowed several unrelated tables in the protocol spec.

I ran no lint, typecheck or build here, as instructed; CI will judge those.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler and answer list_sessions with ISO-dated summaries for session.userId","tdd_next":"listFor failure: log.error('ws') with userId and answer SERVER_ERROR"}}