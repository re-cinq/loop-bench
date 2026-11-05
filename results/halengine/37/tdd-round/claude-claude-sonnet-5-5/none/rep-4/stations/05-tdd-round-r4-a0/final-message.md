This round fixed the red `Ajv` import from CI and added one test, and both are pushed. I ran no typecheck here (it OOMs the pod), so the typecheck failure is not confirmed fixed.

- **CI repair:** `registry.ts` now uses `import {Ajv} from 'ajv'` instead of the default import plus `.default`. The `registry.test.ts` suite ran green locally (3 passed). I can't tell from here why CI's typecheck errors looked like ajv 6 types. The lockfile and `npm ls` show ajv 8.20.0 at the top level, so CI's verdict on this push decides it.
- **Facet closed:** a test that a function-valued tool definition is validated against the schema current at each call. It sits in `registry.test.ts` and is linked from its statement in `specs/hal-engine-tool-input-validation/spec.md`.
- **Red tests:** 0 regressions. The two CI test failures (`config.test.ts` and the `registry.test.ts` extra-property test) were the same "Ajv is not a constructor" error. I wrote the new test and it passed on its first run.
- **Merge and push:** `origin/main` was already merged in, and the branch is not ahead of its upstream.
- **`.lore/dod.md`:** I ticked the new facet and narrowed the remaining one.

**Left for the next round:**
- Unit tests for the wrong-type rejection, the `register` throw, compile-once and the log leak.
- The orchestrator retry test in `chatOrchestrator.test.ts`.
- The docs, README, `.specify/spec.md`, ADR-002 and example updates.

I noticed no unrelated smells.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ajv import repair + function-valued schema validated per call","tdd_next":"registry unit tests (wrong-type, register throw, compile-once, log leak), orchestrator retry test, then docs/README/.specify/ADR-002/example updates"}}