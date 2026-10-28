Committed and pushed five red acceptance tests with the protocol spec links and [Definition of Done](/var/tmp/loop-bench/runs/99af8e0765a0/workspace/target/.lore/dod.md). Strategy: `direct`. The branch is up to date with `origin/main` and its upstream.

I ran only [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/99af8e0765a0/workspace/target/src/transport/conversationList.acceptance.test.ts). The failures reflect the missing protocol behavior:

```text
FAIL src/transport/conversationList.acceptance.test.ts
Tests:       5 failed, 5 total
```

The list response test received `"error"` instead of `"conversation_list"`; the disabled-history test received `"INVALID_MESSAGE"` instead of `"UNSUPPORTED"`. No production code was changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}