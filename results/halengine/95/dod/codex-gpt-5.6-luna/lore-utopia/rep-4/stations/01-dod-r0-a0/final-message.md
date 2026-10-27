Added and pushed commit `8d3ba06` with:

- Failing acceptance test for string, object, and `undefined` rejections.
- `.lore/dod.md` using `direct` strategy.
- Updated spec traceability.

Test run:

```text
NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/onErrorNonErrorRejection.acceptance.test.ts --runInBand
```

Failure confirms `onErrorCalls: 0`, `isError: false`, and `cause: undefined` for all cases.

Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}