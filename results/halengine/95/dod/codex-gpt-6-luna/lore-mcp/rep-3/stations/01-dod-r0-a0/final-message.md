Added and pushed three acceptance cases for string, plain object, and `undefined` provider rejections. Each fails because `onError` is not called, while the caller still receives the original rejection.

The new test is linked from the spec, and `.lore/dod.md` records the `direct` strategy. Commit: `d8e4b5b`. The branch is up to date with `origin/main` and not ahead of its upstream.

Test output: `Tests: 3 failed, 3 total`. For each case, Jest reports `hookCalls: 0` and `hookError: false` where the test expects `hookCalls: 1` and an `Error` with the original rejection as its `cause`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}