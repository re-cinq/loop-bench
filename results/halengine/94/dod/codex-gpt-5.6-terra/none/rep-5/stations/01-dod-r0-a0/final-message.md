Added and pushed commit `ced893e` with:

- New acceptance test: `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- Spec guarantee and traceability link
- `.lore/dod.md` using `direct` strategy

Ran only the named acceptance test. It fails for the intended missing behavior:

```text
Expected calls: ["beforeSession", "onError", "afterSession"]
Received calls: ["beforeSession"]
cleanupSession: undefined
errorHookArguments: undefined
```

Branch is pushed and synchronized with `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}