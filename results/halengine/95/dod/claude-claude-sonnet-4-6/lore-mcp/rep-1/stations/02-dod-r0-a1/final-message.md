No commits from main to merge. The branch is clean and up to date.

**Summary of what's already in place (commit `3113db5`):**

The acceptance test file `src/orchestration/chatOrchestrator.acceptance.test.ts` and `.lore/dod.md` are committed on the branch. All 3 tests fail for exactly the right reason — the `instanceof Error` gate at `chatOrchestrator.ts:150` skips `onError` for non-Error rejections:

```
● calls onError with an Error whose cause is the string when the provider rejects with a string
  - onErrorCalled: false  (expected true)

● calls onError with an Error whose cause is the object when the provider rejects with a plain object
  - onErrorCalled: false  (expected true)

● calls onError with an Error whose cause is undefined when the provider rejects with undefined
  - onErrorCalled: false  (expected true)
```

The spec (`specs/hal-engine-config-hooks/spec.md` lines 19–21) already states the new guarantees with `[validated by ...]` links pointing to these tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}