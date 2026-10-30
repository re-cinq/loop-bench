Completed and pushed commit `6e3f8db`.

- Facet: threaded `sessionStore` into `createMessageHandler` and `createServer`.
- Added one test; observed red, then green.
- Fixed prior CI lint and spec-anchor findings.
- Test run: 1 authored red test, 0 regressions; final run passed.
- Branch is synchronized with `origin/loop-bench/144`.
- Next facet: handle `list_sessions` in the message handler.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"thread sessionStore into createMessageHandler and wire it through createServer","tdd_next":"handle list_sessions in src/transport/ws/messageHandler.ts"}}