Committed and pushed `73c4539` (`test(transport): define conversation list acceptance`). The branch is up to date with its upstream, and `origin/main` was already merged.

The acceptance test uses the real authenticated WebSocket path and fails because the handler rejects the requested behavior:

> `Unknown message type: list_conversations`

**Red test:** `src/transport/ws/conversationList.acceptance.test.ts` — 1 failed, for the expected unsupported-frame reason.

`LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}`