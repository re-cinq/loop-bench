Implemented and pushed the red acceptance DoD.

- Added `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`
- Updated spec traceability and `.lore/dod.md`
- Acceptance test run with the repository’s ESM Jest command
- Confirmed branch is pushed and synchronized with `origin/main`

Failure excerpt:

```text
Expected onErrorCallCount: 1, received 0
Expected receivedErrorIsError: true, received false
Expected causeIsOriginal: true, received false
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}