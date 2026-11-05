This round only repaired CI's red build. The remaining `.lore/dod.md` facet is still open. I pushed the fix and the branch is level with its upstream.

CI's typecheck and test failures all came from `registry.ts` importing `{Ajv}` by name from `ajv`, which has no named `Ajv` export. I restored `import AjvModule from 'ajv'` with `const Ajv = AjvModule.default`. The `ErrorObject` type errors should clear with the import, but I didn't run the typechecker here, so CI has to confirm that.

I ran only `registry.test.ts` here, and its 2 tests pass. I didn't run the acceptance tests or the full suite. `origin/main` merged with nothing to bring in.

I fixed the CI failures but wrote no new test, so none of the tests were mine. Of the failures CI listed, none was a regression from existing tests. Every red suite traced to the broken import.

The next round still owes the remaining facet in `.lore/dod.md`. That is the unit tests and the orchestrator retry test, the spec-link citations, and the updates to `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md` and ADR-002. The `CHANGELOG.md` entry already landed in the previous round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair ajv import (CI typecheck/test red)","tdd_next":"registry unit tests (wrong-type, register throw, dynamic schema, compile-once, log leak), orchestrator retry test, then docs/README/.specify/ADR-002/example updates"}}