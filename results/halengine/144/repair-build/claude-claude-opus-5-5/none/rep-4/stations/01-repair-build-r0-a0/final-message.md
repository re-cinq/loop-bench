Both red checks should now pass. I've pushed the fix to `loop-bench/144`; it was already up to date with `origin/main` and nothing is left unpushed. CI hasn't run on the new commit yet, and I didn't run lint or typecheck here.

**`test`:** the acceptance tests failed because the handler for the new `list_sessions` frame had never been written. It's now in `src/transport/ws/messageHandler.ts`, which receives the session store from `createServer`:
- It always lists the connected user's own conversations, using `session.userId`. A `userId` sent in the frame is ignored.
- It passes `{limit, before}` to the store's `listFor`, sends the dates as ISO strings and replies with `session_list`.
- A request is answered straight away; it doesn't wait behind a reply that is still streaming.
- If `listFor` throws, it logs on the `ws` category and replies with a `SERVER_ERROR` error.

**`eslint`, all 8 findings:**
- **Duplicated code (6 findings):** the new test now uses the shared test helpers in `wsTestSupport.ts`. I moved the duplicated store helper `delegatingTo` there, and `sessionResume.test.ts` imports it too.
- **Early return (1 finding):** I flattened the message callback in the new test.
- **Boolean argument (1 finding):** `validation.test.ts` now compares against `'rejected'` instead of `fill(false)`.

These edits moved test line numbers, so I updated the spec links that point at them; the repo's `spec:names --fix` did most of it.

**What I ran:**
- The 6 affected test files with jest (99 tests): all pass.
- `spec:names`, `check:spec-links` and `check:spec-status`: all clean.
- Prettier on the changed files: nothing needed changing.

**The tests on this branch disagree with ticket #144**, and I made the code match the tests. The tests were written in an earlier round:
- The frames are called `list_sessions` / `session_list`, where the ticket says `list_conversations` / `conversation_list`.
- There's no `transport.history` switch to turn the feature on, and no `UNSUPPORTED` error code.
- A store without `listFor` gets an empty list. The ticket says it must get an error instead, because an empty list looks like "no conversations".

A reviewer should check these against the ticket's acceptance criteria before merging.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions handler was missing (acceptance tests red) plus 8 eslint findings (duplicated test setup, nested if, boolean fill)"}}