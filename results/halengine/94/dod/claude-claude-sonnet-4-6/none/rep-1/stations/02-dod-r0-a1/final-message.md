The spec anchors at `#L32` and `#L50` match the actual test line numbers exactly. Everything is complete and correct.

**Summary:**

A previous round already did this work. The acceptance tests exist at `src/orchestration/chatOrchestrator.acceptance.test.ts` and fail for exactly the right reasons:

```
● when beforeSession throws › onError fires with the thrown error
  Expected: [Error: beforeSession failure]
  Received: undefined

● when beforeSession throws › afterSession fires even when beforeSession throws
  Expected: true
  Received: false
```

Both failures directly reflect the ticket's central claim: `beforeSession` is awaited before the `try` block, so its throw escapes before `catch`/`finally`, meaning neither `onError` nor `afterSession` fires.

- `.lore/dod.md` is committed with strategy `direct`
- The spec (`specs/hal-engine-config-hooks/spec.md` lines 17-18) already carries the `([validated by ...])` links pointing to the correct test lines
- The commit `9149bb1` is pushed to `origin/loop-bench/94`
- Branch is ahead of `origin/main` by exactly that one commit, with nothing from `main` to merge in

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}