Added and pushed commit `b69661c` with:

- One direct acceptance test covering unchanged rejection, `onError` arguments, and subsequent `afterSession`.
- Updated spec traceability and partial-initialization guarantee.
- `.lore/dod.md` with implementation facets.

Test command:

`npm test -- --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts`

Expected red-bar output:

```text
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
Expected: calls [onError, afterSession]
Received: calls []
"rejection": [Error: beforeSession failed]
```

The branch is up to date with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}