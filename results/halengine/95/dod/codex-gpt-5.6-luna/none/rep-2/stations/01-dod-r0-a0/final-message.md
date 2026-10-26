Added and pushed:

- `src/orchestration/nonErrorRejection.acceptance.test.ts`
- `.lore/dod.md`
- Updated spec traceability

Strategy: `direct`

Acceptance test command:

```text
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/nonErrorRejection.acceptance.test.ts
```

It fails for the intended reason:

```text
Expected: 1
Received: 0
```

Commit `5b221c8` is pushed; branch is synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}