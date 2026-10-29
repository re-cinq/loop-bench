**Strategy: `direct`.** I committed and pushed four acceptance tests in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/6792ad5b498e/workspace/target/src/transport/conversationList.acceptance.test.ts). The [Definition of Done](/var/tmp/loop-bench/runs/6792ad5b498e/workspace/target/.lore/dod.md) and protocol spec links are included in commit `d33180f`. The branch is up to date with `origin/main` and its upstream.

I ran only the new test file. **All four tests fail on the missing protocol behavior.** The output includes:

```text
Expected: "conversation_list"
Received: "error"

Expected: "UNSUPPORTED"
Received: "INVALID_MESSAGE"

Tests: 4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}