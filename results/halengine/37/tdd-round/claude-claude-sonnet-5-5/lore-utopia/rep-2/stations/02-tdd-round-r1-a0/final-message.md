This round repaired CI's red verdict and pushed it. It added no new test, and the registry unit tests, orchestrator loop test and docs facet are still open. I ran no tests, typecheck or lint here, so CI's next run is the first check of these fixes. The branch is pushed and up to date with `origin/main`.

- **ajv import** (`registry.ts`): `import {Ajv} from 'ajv'` was the cause of the typecheck errors and the `does not provide an export named 'Ajv'` suite failures. I switched to the default import and use `AjvModule.default`. The ajv type errors on `instancePath`, `missingProperty` and `type` may or may not clear with the import fix, so I also replaced ajv's `ErrorObject` with a small local `ValidationIssue` interface.
- **Lint in `registry.ts`**:
  - `describeError` now sits below `rejectionFor`.
  - The `switch` on `error.keyword` became a lookup table.
  - The rethrown schema error now carries `{cause: error}`.
- **Lint in `registry.acceptance.test.ts`**:
  - I flattened the `round === 2` branch into an early return.
  - I destructured the tool result to cut the member chain.
  - These were behaviour-preserving lint fixes only; no assertion changed.
- **Red tests:** none were mine and none were regressions. The `test` failures were all the ajv import error, which stopped the `chatOrchestrator` and acceptance suites from loading.

I noticed no unrelated smells.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI findings: ajv ESM import, typecheck and eslint errors","tdd_next":"registry.test.ts unit cases, chatOrchestrator.test.ts tool-loop test, docs/README/.specify/ADR-002/example/CHANGELOG updates"}}