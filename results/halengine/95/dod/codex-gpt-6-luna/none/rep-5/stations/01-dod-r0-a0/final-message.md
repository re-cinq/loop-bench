Added one parameterized acceptance test for string, plain object, and `undefined` rejections, and linked it from the config hooks spec. The `direct` DoD is in [.lore/dod.md](/var/tmp/loop-bench/runs/1cc5feeff9f6/workspace/target/.lore/dod.md).

All three cases fail at the hook call-count assertion, matching the ticket’s reported behavior:

```text
Expected length: 1
Received length: 0
```

Committed and pushed as `a269365` (`test: pin onError for non-Error rejections`). `origin/main` was already up to date, and the branch is even with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}