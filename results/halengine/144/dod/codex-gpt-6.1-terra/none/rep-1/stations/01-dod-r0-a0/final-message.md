Committed and pushed the `direct` acceptance tests and [definition of done](/var/tmp/loop-bench/runs/4d41b10ba39b/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and is not ahead of its upstream.

Ran `npm test -- --runInBand --runTestsByPath src/transport/conversationList.acceptance.test.ts`. All three tests failed because the protocol does not yet recognize the request:

```text
"error": "Unknown message type: list_conversations"
"valid": false
```

The socket tests received `INVALID_MESSAGE` where they expected a `conversation_list` or an `UNSUPPORTED` error.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}