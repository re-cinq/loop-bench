Added and pushed commit `598495d` with:

- New red acceptance test: `src/orchestration/chatOrchestrator.acceptance.test.ts`
- DoD record: `.lore/dod.md`
- Spec guarantee and traceability citation update.

Ran only:

```text
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts
```

Actual failure:

```text
Expected hookCalls: 1; Received hookCalls: 0
```

This occurs for string, plain-object, and `undefined` provider rejections, while each still reaches the caller unchanged. Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}