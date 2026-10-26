Created and pushed commit `cd71116` with:

- One direct acceptance test covering rejection identity, `onError`, `afterSession`, and ordering.
- Updated spec traceability.
- `.lore/dod.md` with `direct` strategy and facets.

Acceptance command:

```text
npm test -- --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts
```

Actual failure:

```text
Expected order: ["beforeSession", "onError", "afterSession"]
Received order: ["beforeSession"]
Received onErrorArgs: undefined
Received afterSessionArg: undefined
```

Branch is up to date with `origin/main` and upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}