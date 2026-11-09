Committed and pushed the `direct` acceptance tests in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/6cbe0224bded/workspace/target/src/transport/conversationList.acceptance.test.ts), with the remaining implementation facets recorded in [dod.md](/var/tmp/loop-bench/runs/6cbe0224bded/workspace/target/.lore/dod.md).

The named test file ran with **3 failures**. The validator and socket both report the missing frame:

```text
error: "Unknown message type: list_conversations"
valid: false
```

The socket tests received `INVALID_MESSAGE` where they expected a `conversation_list` and, with history disabled, `UNSUPPORTED`.

Commit `50df149` is pushed; the branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}