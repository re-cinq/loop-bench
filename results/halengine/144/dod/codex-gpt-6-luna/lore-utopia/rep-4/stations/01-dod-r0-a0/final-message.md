Added three direct acceptance tests in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/4f82ea1f46d3/workspace/target/src/transport/ws/conversationList.acceptance.test.ts), documented the `direct` strategy in [`.lore/dod.md`](/var/tmp/loop-bench/runs/4f82ea1f46d3/workspace/target/.lore/dod.md), and added protocol statements with test citations.

The named test file ran and all three tests failed for the missing protocol behavior. Actual failure output included:

```text
Expected: "conversation_list"
Received: "error"

Expected: valid: true
Received: valid: false, error: "Unknown message type: list_conversations"

Expected: code: "UNSUPPORTED"
Received: code: "INVALID_MESSAGE"
```

Committed as `5df92b6` and pushed. The branch is up to date with `origin/main`, and `git status` reports no uncommitted changes. The requested `scripts/spec-links/reanchor.mjs` is absent in this checkout; I verified the citation lines manually.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}