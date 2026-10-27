Added and pushed commit `214e2d9`.

- Strategy: `direct`
- Acceptance test: `src/orchestration/beforeSession.acceptance.test.ts`
- Updated spec traceability and `.lore/dod.md`
- Test intentionally fails because `onError` and `afterSession` are not invoked.

Failure excerpt:

```text
Expected:
callOrder: ["beforeSession", "onError", "afterSession"]
onErrorArgument: [Error: beforeSession boom]

Received:
callOrder: ["beforeSession"]
onErrorArgument: undefined
```

Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}