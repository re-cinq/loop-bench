Added and pushed commit `028ffcd` with red acceptance coverage and DoD:

- [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/3a3906838c5e/workspace/target/src/transport/ws/conversationList.acceptance.test.ts)
- [dod.md](/var/tmp/loop-bench/runs/3a3906838c5e/workspace/target/.lore/dod.md)
- Protocol citations in [spec.md](/var/tmp/loop-bench/runs/3a3906838c5e/workspace/target/specs/hal-engine-websocket-protocol/spec.md)

Ran only:

```sh
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/transport/ws/conversationList.acceptance.test.ts
```

Actual red-bar output: expected a valid `list_conversations` frame, received:

```text
{ valid: false, error: "Unknown message type: list_conversations" }
```

All three acceptance tests fail for the absent protocol behavior. Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}