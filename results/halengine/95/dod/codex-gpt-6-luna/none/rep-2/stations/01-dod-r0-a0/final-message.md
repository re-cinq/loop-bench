Added one parameterized acceptance test covering string, plain object, and `undefined` rejections. All three fail because `onError` receives no call. The spec now states the guarantee, and the DoD records the `direct` strategy.

The test command failed with:

```text
Expected length: 1
Received length: 0
Received array:  []
```

Committed and pushed as `e7e6541`; the branch is up to date with `origin/main`, and the working tree is clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}