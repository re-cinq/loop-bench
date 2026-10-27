Added and pushed:

- Direct acceptance test covering string, object, and `undefined` rejections.
- Updated spec traceability and `.lore/dod.md`.
- Commit: `b1c2cc3`
- Branch is clean and synchronized.

Test command:

```text
npm test -- --runInBand src/orchestration/onErrorNonErrorRejection.acceptance.test.ts
```

Expected red failure:

```text
Expected length: 1
Received length: 0
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}