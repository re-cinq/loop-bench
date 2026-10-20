Resolved the CI typecheck, eslint, and test failures from the previous push:
- Replaced the invalid `{type: 'status', message: 'Checked weather'}` fixture in `src/orchestration/tools/registry.test.ts` with a valid `PongMessage` (`{type: 'pong', timestamp: 123}`).
- Removed the non-null assertion on `validator.errors` in `src/orchestration/tools/registry.ts` to satisfy `@typescript-eslint/no-non-null-assertion`.
- Resolved `Ajv` via `typeof AjvModule === 'function' ? AjvModule : AjvModule.default` in `src/orchestration/tools/registry.ts` so both NodeNext `tsc` and `ts-jest`'s `esModuleInterop` interop construct `Ajv` without throwing `TypeError: AjvModule.default is not a constructor`.
- Red tests on the previous push: 13 of ours (8 in `registry.test.ts`, 4 in `registry.acceptance.test.ts`, 1 in `chatOrchestrator.test.ts`), 0 regressions (all caused by module-load failure in `registry.ts`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Resolve CI typecheck, eslint, and Ajv CJS/ESM interop failures in ToolRegistry and its tests","tdd_next":"acceptance green"}}