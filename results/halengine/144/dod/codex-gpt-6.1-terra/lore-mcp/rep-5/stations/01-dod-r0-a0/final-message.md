Committed and pushed the `direct` acceptance tests and [definition of done](/var/tmp/loop-bench/runs/ef46ad48d5ef/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The [acceptance test file](/var/tmp/loop-bench/runs/ef46ad48d5ef/workspace/target/src/transport/conversationList.acceptance.test.ts) ran with three failures, all because the request is currently unrecognized:

```text
Expected: valid: true
Received: error: "Unknown message type: list_conversations", valid: false

Expected: type: "conversation_list"
Received: code: "INVALID_MESSAGE", message: "Unknown message type: list_conversations"

Expected: code: "UNSUPPORTED"
Received: code: "INVALID_MESSAGE"

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

The DoD also records remaining verification facets for store failures, concurrent streaming and reconnect replay; those behaviors are not covered by the three new tests yet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}