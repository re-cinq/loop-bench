Added and pushed commit `e01bd70`.

- Strategy: `direct`
- Acceptance test: `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- Updated spec traceability and `.lore/dod.md`
- Test command run:
  `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts`

Actual failure confirms the missing behavior:

> `calls`: `["beforeSession"]`  
> `receivedError`: `undefined`  
> `afterSessionSession`: `undefined`

Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}