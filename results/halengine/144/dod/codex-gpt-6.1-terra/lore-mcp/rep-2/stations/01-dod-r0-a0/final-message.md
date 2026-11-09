Added and pushed three acceptance tests using the `direct` strategy. They exercise validation and real WebSocket requests against the in-memory store. The branch is up to date with `origin/main` and is not ahead of its upstream.

Running `npm test -- --runInBand --runTestsByPath src/transport/conversationList.acceptance.test.ts` produced three failures:

```text
validates a list request and its composite cursor
  Expected: valid: true
  Received: error: "Unknown message type: list_conversations", valid: false

returns only the authenticated user’s summaries and pages them over the socket
  Expected: type: "conversation_list"
  Received: code: "INVALID_MESSAGE", message: "Unknown message type: list_conversations"

refuses a list when history is disabled
  Expected: code: "UNSUPPORTED"
  Received: code: "INVALID_MESSAGE", message: "Unknown message type: list_conversations"

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

The tests do **not** yet establish the full ticket contract: store failures, unsupported stores, and requests during streaming remain facets in [the definition of done](/var/tmp/loop-bench/runs/97297f258253/workspace/target/.lore/dod.md), without executable acceptance coverage.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}