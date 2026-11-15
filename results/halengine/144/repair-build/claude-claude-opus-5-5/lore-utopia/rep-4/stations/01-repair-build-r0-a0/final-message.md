I fixed both red checks (`test` and `eslint`) and pushed commit `04577eb` to `loop-bench/144`. The branch already contained `origin/main`, so there was nothing to merge, and it is not ahead of its upstream. Locally, the 4 affected test files pass: 86 tests, including all 3 acceptance tests that were failing in CI. As instructed, I did not run eslint, a typecheck or the build here, so CI is the first check on those.

**test**: the earlier rounds added the `list_sessions` types and validation but never wrote the handler, so the acceptance tests got no answer. Now:
- `createMessageHandler` takes the session store as an optional second argument, and `createServer` passes it in.
- `list_sessions` is answered on the same path as `ping`, so it doesn't wait behind a streaming answer.
- The store is asked for the connection's own user (`session.userId`), with `{limit, before}` from the frame. Any `userId` the client sends is ignored.
- The reply is a `session_list` with dates as ISO strings, built by a new `sendSessionList` in `sender.ts`.
- If `listFor` fails, the error is logged under `ws` with the session id, user id and error message. The client gets a plain `SERVER_ERROR` with no store detail.

**eslint**, all 8 findings:
- **Duplicated code (7 findings):** `delegatingTo` now lives in `wsTestSupport.ts` and both test files import it. The acceptance test uses that file's existing engine, client and teardown helpers instead of its own copies. Its teardown also waits for the server's sockets to close; without that, the server logged "disconnected" after the tests had finished.
- **Nested `if` (1 finding):** the frame handler in `askAfterConnect` now uses early returns.
- **Boolean argument (1 finding):** `validation.test.ts` compares `'accepted'`/`'rejected'` strings instead of `fill(false)`.
- **Spec citations:** moving the tests shifted the line numbers that three specs cite. I updated them with `npm run spec:names:fix`, and `spec:names`, `check:spec-links` and `check:spec-status` all pass.

**This branch does not match the ticket.** The previous rounds' tests and checklist (`.lore/dod.md`) differ from #144, and I made them pass as written:
- The frames are named `list_sessions`/`session_list`, not `list_conversations`/`conversation_list`.
- A store without `listFor` gets an empty list, where the ticket requires an `UNSUPPORTED` error and says an empty list is the wrong answer.
- There is no `transport.history` setting yet, so the feature cannot be switched off.
- There is no `StoreCannotList`.

Matching the ticket means changing those tests on purpose in a later round, which was beyond fixing this build.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions was never handled (acceptance tests red) and 8 eslint findings (duplicated test helpers, nested if, boolean arg) in the new tests"}}