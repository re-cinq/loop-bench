Added and pushed commit `abff4c7`.

- New red acceptance test: `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- Recorded direct-strategy DoD in `.lore/dod.md`
- Replaced the obsolete spec flaw with the intended lifecycle guarantee and test citation.

Ran only:

```text
npm test -- src/orchestration/beforeSessionFailure.acceptance.test.ts
```

Actual failure:

```text
Expected calls: ["beforeSession", "onError", "afterSession"]
Received calls: ["beforeSession"]
```

The original rejection remains intact, while both required hooks are absent—the ticket’s reported behavior. Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}