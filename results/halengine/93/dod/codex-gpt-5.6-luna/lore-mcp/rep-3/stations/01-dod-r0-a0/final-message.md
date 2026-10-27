Implemented and pushed red acceptance tests using `direct` strategy.

- Added `src/orchestration/usageReporting.acceptance.test.ts`
- Added `.lore/dod.md`
- Updated spec traceability
- Commit: `730b503`
- Branch synchronized with upstream (`0 0`)

Command run:

```text
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/usageReporting.acceptance.test.ts --no-coverage
```

Failures quote the missing behavior:

```text
Expected: inputTokens 60, outputTokens 9, totalTokens 69
Received: inputTokens 30, outputTokens 4, totalTokens 34
```

```text
Expected: inputTokens 20, outputTokens 3, totalTokens 23
Received: inputTokens 13, outputTokens 2, totalTokens 15
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}