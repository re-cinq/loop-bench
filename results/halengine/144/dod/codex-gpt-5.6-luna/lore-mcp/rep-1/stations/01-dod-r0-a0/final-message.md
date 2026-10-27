Added and pushed:

- [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/f861318dbf07/workspace/target/src/transport/ws/conversationList.acceptance.test.ts)
- [.lore/dod.md](/var/tmp/loop-bench/runs/f861318dbf07/workspace/target/.lore/dod.md)

Strategy: `direct`. Commit: `d27f6a3`.

Ran only the acceptance file. All 3 tests fail for the missing feature:

> `Unknown message type: list_conversations`

> Expected `type: "conversation_list"`, received `type: "error"`

> Expected error code `UNSUPPORTED`, received `INVALID_MESSAGE`

Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}