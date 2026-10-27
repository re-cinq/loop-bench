Added and pushed commit `2e358ad` with:

- Direct acceptance test: `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- DoD: `.lore/dod.md`
- Spec traceability update.

Ran only:

```text
npm test -- src/orchestration/beforeSessionFailure.acceptance.test.ts
```

It fails for the intended reason:

```text
Expected callOrder: ["beforeSession", "onError", "afterSession"]
Received callOrder: ["beforeSession"]
receivedError: undefined
```

Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}