Committed and pushed the `direct` acceptance tests in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/9ae7acf2659f/workspace/target/src/transport/conversationList.acceptance.test.ts), with the strategy and remaining facets in [dod.md](/var/tmp/loop-bench/runs/9ae7acf2659f/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The named test file ran with three failures. The relevant output was:

```text
validates conversation list requests and their composite cursors
  Expected: valid: true
  Received: error: "Unknown message type: list_conversations", valid: false

delivers only the authenticated user’s summaries when history is enabled
  Expected: type: "conversation_list"
  Received: code: "INVALID_MESSAGE", message: "Unknown message type: list_conversations"

refuses a conversation list when history is disabled
  Expected: code: "UNSUPPORTED"
  Received: code: "INVALID_MESSAGE"
```

The tests cover validation, authenticated delivery, and opt-in refusal. **They do not yet fully establish DONE:** paging, store failures, concurrent streaming, and reconnect behavior still need acceptance coverage, as recorded in the facets. Jest also reported a late disconnect log after the tests completed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}