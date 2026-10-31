Added and pushed commit `8b24b2b` with:

- Acceptance test: `src/orchestration/chatOrchestrator.acceptance.test.ts`
- Updated spec guarantee and traceability link
- `.lore/dod.md` using `direct` strategy

Ran only:

`node scripts/lore-run-test.mjs 'src/orchestration/chatOrchestrator.acceptance.test.ts::reports every rejection to onError without changing what the caller receives'`

Actual behavioral failure:

```text
Expected length: 1
Received length: 0
Received array: []
```

The branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}