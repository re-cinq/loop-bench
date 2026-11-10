Defined the Definition of Done (`.lore/dod.md`) with strategy `direct`, added the acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts`, and updated `specs/hal-engine-config-hooks/spec.md` with test citations.

CI runs the acceptance tests in `.github/workflows/ci.yml` (`Verify` job, `Test (with coverage floor)` step):
```
npm run test:coverage
```
(which runs `node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}