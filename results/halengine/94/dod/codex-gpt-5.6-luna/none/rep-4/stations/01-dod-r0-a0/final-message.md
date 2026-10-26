Added and pushed:

- `.lore/dod.md`
- `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- Updated spec traceability

Strategy: `direct`

Acceptance test intentionally fails with:

```text
Expected calls: ["beforeSession", "onError", "afterSession"]
Received calls: ["beforeSession"]
receivedError: undefined
receivedSession: undefined
```

Command run:

```text
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts
```

Commit `756a0cc` is pushed, merged with `origin/main`, and the branch is synchronized.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}