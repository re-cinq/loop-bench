Added and pushed commit `d625cc3` with one acceptance test for string, plain object, and `undefined` provider rejections. The spec now states the expected guarantee, and `.lore/dod.md` records the `direct` strategy. No production code was changed.

The named test fails for the ticket’s stated reason:

```text
Expected: hookCalls: 1, hookError: true, cause: "provider failed"
Received: hookCalls: 0, hookError: false, cause: undefined
```

The caller still receives the original rejection. Formatting completed, the branch is up to date with `origin/main`, and `git status` shows it is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}