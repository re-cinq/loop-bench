Added and pushed commit `e1f48f2` with a direct acceptance test for string, plain-object, and `undefined` provider rejections. Updated the config-hooks spec and added the DoD.

The named test command failed in all three cases at `expect(observed).toHaveLength(1)`: expected 1, received 0. The caller’s rejection remained unchanged, but `onError` was not called.

The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}