Committed and pushed five red acceptance tests for ticket #144 in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/b95c68a47728/workspace/target/src/transport/conversationList.acceptance.test.ts). The [DoD](/var/tmp/loop-bench/runs/b95c68a47728/workspace/target/.lore/dod.md) records the `direct` strategy. The branch is up to date with `origin/main` and its upstream.

I ran only that test file. Jest reported `Tests: 5 failed, 5 total`. The failures show the missing behavior: `Expected: "conversation_list" / Received: "error"` and `Expected: "UNSUPPORTED" / Received: "INVALID_MESSAGE"`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}