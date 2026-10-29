**Strategy: `direct`.** I committed and pushed one acceptance test for ticket #95, the linked spec guarantee, and [.lore/dod.md](/var/tmp/loop-bench/runs/b8daf96fd88f/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The named test was run and fails for the reported behavior:

> `"hookCalls": 1` expected; `"hookCalls": 0` received for the string, plain object, and `undefined` rejections.  
> `Tests: 1 failed, 1 total`

The caller received each original rejection. No production code was changed. Commit: `9f8e59d`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}