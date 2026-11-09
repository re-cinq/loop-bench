Committed and pushed the `direct` acceptance tests in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/60bcc9e741f6/workspace/target/src/transport/conversationList.acceptance.test.ts), with the implementation facets recorded in [dod.md](/var/tmp/loop-bench/runs/60bcc9e741f6/workspace/target/.lore/dod.md).

The named Jest run reported **4 failed tests**, all because the server currently rejects `list_conversations` as unknown. Representative output:

```text
Expected: valid: true
Received: "error": "Unknown message type: list_conversations", "valid": false

Expected: "type": "conversation_list"
Received: "code": "INVALID_MESSAGE",
          "message": "Unknown message type: list_conversations",
          "type": "error"

Expected: "code": "UNSUPPORTED"
Received: "code": "INVALID_MESSAGE"
```

The run also reported a late disconnect log after the tests completed. The tests do not yet independently exercise listing during streaming or reconnecting to a listed conversation; those remain named facets in the DoD.

Commit `eb71bc3` is pushed, and the branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}