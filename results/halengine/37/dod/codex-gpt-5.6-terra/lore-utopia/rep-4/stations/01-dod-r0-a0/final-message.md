Added and pushed commit `aa1a2fb` with the direct-strategy DoD, new spec, and two standalone acceptance test files.

Ran only:

```sh
npm test -- --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts src/orchestration/toolInputValidation.acceptance.test.ts
```

Actual red failures include:

```text
Expected "executorCalls": 1
Received "executorCalls": 3
Expected "missingNamesRequiredLocation": true
Received "missingNamesRequiredLocation": false
```

```text
Expected pattern: /broken-schema/
Received function did not throw
```

```text
Expected "rejectionReachedProvider": true
Received "rejectionReachedProvider": false
```

Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}