Added and pushed commit `6a32e19` with:

- Red acceptance test: `src/orchestration/chatOrchestrator.acceptance.test.ts`
- Updated linked spec guarantee
- `.lore/dod.md` using `direct` strategy

Ran only the new test. Actual failure:

```text
Expected: 1
Received: 0
```

The provider’s string rejection reaches the caller, but `onError` is not called—exactly the reported defect. Branch is merged with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}