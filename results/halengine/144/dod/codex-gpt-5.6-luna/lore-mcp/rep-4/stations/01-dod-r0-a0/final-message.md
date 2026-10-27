Added and pushed:

- [conversation-list.acceptance.test.ts](/var/tmp/loop-bench/runs/3d63c7c74dce/workspace/target/src/transport/conversation-list.acceptance.test.ts)
- [.lore/dod.md](/var/tmp/loop-bench/runs/3d63c7c74dce/workspace/target/.lore/dod.md)

Strategy: `direct`. Acceptance tests intentionally fail with:

- `Unknown message type: list_conversations`
- expected conversation list, received `undefined`
- expected `UNSUPPORTED`, received `INVALID_MESSAGE`

Commit `609d4c7` is pushed and the branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}