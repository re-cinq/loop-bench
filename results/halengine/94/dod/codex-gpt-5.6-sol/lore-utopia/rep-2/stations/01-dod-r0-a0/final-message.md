Defined and pushed the direct acceptance contract in commit `1da32e2`.

Added:

- `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- `.lore/dod.md`
- Traceability update in `specs/hal-engine-config-hooks/spec.md`

The targeted test fails for the intended reason:

```text
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts

Expected calls:
  beforeSession
  onError
  afterSession

Received calls:
  beforeSession

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

Command run:

```text
npm test -- --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts --runInBand
```

The branch is merged with `origin/main`, pushed, clean, and synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}