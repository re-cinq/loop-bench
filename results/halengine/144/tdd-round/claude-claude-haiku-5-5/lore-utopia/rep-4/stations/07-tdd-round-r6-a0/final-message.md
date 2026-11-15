The round delivered one closed facet and the CI lint finding is fixed. The branch is pushed and in sync with its upstream, and `origin/main` is already merged in, so no merge was needed. The acceptance tests were not run here, so CI's verdict on this push is still open.

**CI findings from the last push**
- `src/transport/wsTestSupport.ts:124` (eslint `max-member-chain`): fixed with a small `openSockets(wss)` helper. I could not run eslint here, so this is verified by reading only.
- The two `conversationList.acceptance.test.ts` failures are acceptance tests, not findings I can fix. I did not edit them. Both failed because `list_sessions` was not yet handled, which this round addressed. Neither is a regression of an existing test.

**This round (TDD)**
- Red: added a unit test in `src/transport/ws/messageHandler.test.ts` (`list_sessions`) asserting `listFor` is called with the connection's `userId` and that `session_list` carries ISO dates. It failed with zero calls to `listFor`.
- Green: threaded an optional `sessionStore` through `createMessageHandler` and `createServer`, added `session_list` types in `messages.ts`, a `sendSessionList` in `sender.ts`, and a `list_sessions` branch that runs off the per-session lock. The test passes.
- Refactor: narrowed the message the same way the existing user-message path does and ran prettier on the changed files.
- Tests run here: only `messageHandler.test.ts` filtered to `list_sessions`. No other tests, lint, or typecheck were run.
- Red tests: one of mine, and it is green now. Regressions: none identified; the CI verdict named no existing test that I know of going red.

**Open items, not done this round**
- **Conflict on no-`listFor` behaviour.** The acceptance test expects an empty `session_list`. The ticket says it must be an `error` (`UNSUPPORTED`), not an empty list. The current code follows the acceptance test. This needs a decision before that facet closes.
- **Name mismatch.** The ticket specifies `list_conversations` / `conversation_list`. The dod and acceptance tests use `list_sessions` / `session_list`. I followed the dod.
- **Error path.** A rejecting `listFor` still logs under category `message`; the acceptance test expects `ws`. `SERVER_ERROR` is sent correctly.
- **Spec citation.** The new unit test has no `validated by` link in the spec yet.
- **Facet 1.** The `src/index.ts` re-export is not checked.

`.lore/dod.md` is updated: the threading facet is ticked, and the open items above are recorded as unchecked.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"list_sessions happy path: sessionStore threaded, session_list answered off the lock with ISO dates; eslint max-member-chain fixed","tdd_next":"list_sessions error path (SERVER_ERROR with ws log); resolve no-listFor empty-list vs UNSUPPORTED conflict"}}