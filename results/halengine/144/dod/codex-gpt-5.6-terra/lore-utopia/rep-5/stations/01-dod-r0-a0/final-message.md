Added and pushed red acceptance coverage in commit `78768c9`.

- [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/759e6e71eb63/workspace/target/src/transport/ws/conversationList.acceptance.test.ts) exercises validation and real authenticated WebSocket delivery.
- [.lore/dod.md](/var/tmp/loop-bench/runs/759e6e71eb63/workspace/target/.lore/dod.md) records the direct strategy and completion facets.
- Protocol statements now cite the new tests.

Ran:

```sh
NODE_OPTIONS=--experimental-vm-modules npx jest --runInBand src/transport/ws/conversationList.acceptance.test.ts
```

Actual red failures include:

```text
error: "Unknown message type: list_conversations"
calls: []
ids: undefined
Expected code: "UNSUPPORTED"
Received code: "INVALID_MESSAGE"
```

Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}