Added one direct acceptance test covering string, plain-object, and `undefined` provider rejections, and updated the spec and DoD. The test is committed and pushed in `40bc5cd`; the branch is up to date with its upstream, and `origin/main` was already merged.

The test failed for the ticket’s stated reason:

```text
Expected: 1
Received: 0

at Object.<anonymous> (src/orchestration/onErrorNonErrorRejection.acceptance.test.ts:44:28)
```

`npx prettier --write` formatted the changed TypeScript file. No other tests, lint, or typecheck were run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}