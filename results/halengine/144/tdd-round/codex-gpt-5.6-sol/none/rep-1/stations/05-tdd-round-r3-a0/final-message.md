Completed and pushed commit `846d2f5`.

- Added one failing-then-passing handler test.
- Threaded `sessionStore` through `createServer` and `createMessageHandler`.
- Repaired visible stale spec anchors from prior CI.
- Test result: 1 passed; 1 intentional red test, 0 identified regression tests.
- Next facet: serialize/send `session_list` and handle missing/throwing stores.
- Branch is synchronized with `origin`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"thread sessionStore into createMessageHandler and wire it in createServer","tdd_next":"handle list_sessions responses, serialization, and store errors"}}