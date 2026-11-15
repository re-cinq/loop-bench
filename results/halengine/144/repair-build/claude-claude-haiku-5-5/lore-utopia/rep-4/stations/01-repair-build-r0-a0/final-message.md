Pushed `e69f887` to `loop-bench/144`. The branch is no longer ahead of its upstream. The judged head was `5cd4e67`, and nothing had moved past it.

**What was broken**
- **test:** `conversationList.acceptance.test.ts` failed because `list_sessions` was never handled. The previous round had left the handler as its "Next" step.
- **eslint:** four `no-duplicate-code` findings across the acceptance and `sessionResume` suites, one `prefer-early-return` in the acceptance suite, and one `no-flag-params` in `validation.test.ts:58`.

**What I changed**
- **Handler** (`messageHandler.ts`): `list_sessions` is answered off the per-session lock, with a `session_list` of the connection's own user. Dates go out as ISO strings. A missing `listFor` or a disabled `history` option gets an `UNSUPPORTED` error. A throwing `listFor` gets a `SERVER_ERROR` plus a `ws` error log.
- **Wiring**: `createServer` takes an opt-in `history?: {enabled: boolean}` option and passes the store and the option to the handler. `ErrorCodes` gains `UNSUPPORTED`.
- **Test expectation**: the no-`listFor` case expected an empty `session_list`. The ticket says that case must be an `error`, so I changed the test to expect `UNSUPPORTED`. The ticket is the source of truth here.
- **Opt-in in the test**: the acceptance suite now enables `history`, because the feature is default-off.
- **Lint**: the duplicated helpers (`delegatingTo`, the WebSocket connect and teardown) moved into `wsTestSupport.ts`. The acceptance and `sessionResume` suites import them. The `if` in `askAfterConnect` is now early returns. `Array(9).fill(false)` became `Array.from`.

**What I ran**
- `jest` on the four touched suites: 86 of 86 passed.
- `jest` on all of `src/transport` plus `src/toolDeadline.test.ts`: 218 of 218 passed.
- `prettier --write` on the seven changed files.
- I did not run eslint, per the pod rules. The lint fixes are made by reading the annotations, so CI has to confirm them.
- I did not run the full `test:coverage` suite. Suites outside the transport folder were not run.

**Left as-is**
- The ticket names `list_conversations`/`conversation_list`, and the branch uses `list_sessions`/`session_list`. I kept the branch's names.
- `transport.history` is not yet threaded through `config.ts`.
- The acceptance run prints "Cannot log after tests are done" lines from socket teardown. The suite passes; the noise is a side effect of dropping the wait-before-stop.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions handler added (UNSUPPORTED/opt-in), acceptance test corrected to the ticket's error contract, and duplicated test helpers and two lint findings fixed; eslint not run locally"}}