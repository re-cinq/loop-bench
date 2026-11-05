I implemented `list_sessions` handling, which was the cause of the red `test` check, and cleared all eight eslint findings. The fix is pushed and the branch is not ahead of its upstream. I did not run the linter or typecheck, as instructed, so CI has to confirm those.

- **`test` check:** the earlier round had added the types and validation but never handled the frame, so the acceptance tests failed. `createMessageHandler` now takes the session store, and `createServer` passes it in. A `list_sessions` frame is answered with a `session_list` frame:
  - It uses the connection's own `session.userId` and passes `{limit, before}` to `listFor`.
  - The two timestamps go out as ISO strings.
  - A store with no `listFor` gets an empty list.
  - A rejecting `listFor` gets a `SERVER_ERROR` frame and a `ws` error log with the user id and the error text.
- **eslint, duplicate code (6 findings):** I moved `eventually`, `delegatingTo` and a new `terminateAndStop` into `src/transport/wsTestSupport.ts`. `conversationList.acceptance.test.ts` and `sessionResume.test.ts` now import them.
- **eslint, early return:** I flattened the `message` listener in the acceptance test.
- **eslint, flag param:** in `validation.test.ts` I replaced `.fill(false)` with `Array.from({length: 9}, () => false)`.

I ran prettier on the changed files. I ran the three affected suites with the repo's jest command (`node --experimental-vm-modules node_modules/jest/bin/jest.js`) without coverage, and all 32 tests passed. Merging `origin/main` was a no-op.

The branch uses the earlier round's names (`list_sessions` / `session_list`) with no opt-in flag, not the ticket's `list_conversations` / `conversation_list` with `transport.history`. I followed the red acceptance tests and did not rename. The ticket's other items (the `UNSUPPORTED` code, the config flag, specs and docs) are still undone, and those tests don't require them.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Handled list_sessions in messageHandler (store threaded from createServer) so the acceptance tests pass, and removed the test-helper duplication, nested-if and boolean-flag lint findings"}}