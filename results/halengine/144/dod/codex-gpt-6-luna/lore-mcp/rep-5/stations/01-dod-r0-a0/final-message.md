Added five acceptance tests in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/b91ee7052cb0/workspace/target/src/transport/ws/conversationList.acceptance.test.ts), documented the `direct` strategy in [`.lore/dod.md`](/var/tmp/loop-bench/runs/b91ee7052cb0/workspace/target/.lore/dod.md), and added spec citations.

The named test file fails all five tests. Actual failures include:

> `Unknown message type: list_conversations`

> Expected `code: "UNSUPPORTED"`; received `code: "INVALID_MESSAGE"`.

Committed as `5952378` and pushed. `git status` shows the branch matches its upstream; `origin/main` was already up to date. No production code was changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}