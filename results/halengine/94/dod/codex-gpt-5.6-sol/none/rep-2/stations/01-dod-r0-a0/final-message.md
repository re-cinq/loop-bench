Added and pushed commit `3e5269e` with:

- One direct acceptance test in `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- Traceability update in the hooks spec
- `.lore/dod.md` defining remaining work

The targeted test fails for the expected reason:

```text
Expected lifecycle:
  onError
  afterSession

Received lifecycle:
  []

"rejection": [Error: beforeSession failed]
```

Command run:

```text
npm test -- --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts --runInBand
```

Result: `1 failed, 1 total`. The branch is pushed, current with `origin/main`, and not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}