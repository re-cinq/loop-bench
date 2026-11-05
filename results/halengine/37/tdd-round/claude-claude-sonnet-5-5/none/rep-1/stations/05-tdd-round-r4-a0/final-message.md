This round fixed CI's red build and pushed it. The branch is not ahead of its upstream, and `origin/main` was already merged in. Ticket #37 is still not done: the open facet below hasn't started.

**The fix.** `src/orchestration/tools/registry.ts` used `import {Ajv} from 'ajv'`. ajv is CommonJS (`module.exports = Ajv`), so Node's ESM loader found no `Ajv` export (the "does not provide an export named 'Ajv'" failure). TypeScript's NodeNext typing also treated `Ajv` as a type only (the TS2693 error). I switched to the default import, cast to the class, with a one-line comment saying why.

**Tests.**
- I ran `registry.test.ts` locally and all 4 tests pass.
- I did not run the acceptance tests, the typechecker or lint, as instructed.
- I could not confirm locally that the two `instancePath` / `missingProperty` TypeScript errors are gone. I expect they came from the broken import, but CI will show.
- Red tests: none were mine and none were regressions. Every failure CI listed was a suite that failed to load because of the import.

**Still open on the ticket.**
- The compile-once-across-ten-calls test.
- The test that logs and results never contain a rejected property's value.
- The retry-loop test in `chatOrchestrator.test.ts`.
- Docs: `docs/adding-a-tool.md`, `README.md` and `.specify/spec.md`.
- Also still to do: `CHANGELOG.md`, the ADR-002 edit and `example/weather-tool.ts`.

I left the fourth facet in `.lore/dod.md` unticked and noted the import fix there.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix ajv default import (CI red: module load + typecheck)","tdd_next":"compile-once x10 test, leak-in-logs test, chatOrchestrator retry loop test, then docs/README/.specify/CHANGELOG/ADR/weather-tool"}}