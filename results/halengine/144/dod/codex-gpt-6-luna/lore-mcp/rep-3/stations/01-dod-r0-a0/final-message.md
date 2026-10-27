Added and pushed one direct acceptance test in [messageHandler.acceptance.test.ts](/var/tmp/loop-bench/runs/f43733c4f8d6/workspace/target/src/transport/ws/messageHandler.acceptance.test.ts), with its spec citation and [DoD](/var/tmp/loop-bench/runs/f43733c4f8d6/workspace/target/.lore/dod.md).

The named test fails because the handler rejects the unimplemented frame:

> `Unknown message type: list_conversations`  
> `Expected length: 1`  
> `Received length: 0`

Commit `930c8a7` is pushed. `origin/main` was already merged, and the branch is synchronized with its upstream. `scripts/spec-links/reanchor.mjs` was absent, so I checked the citation line manually.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}