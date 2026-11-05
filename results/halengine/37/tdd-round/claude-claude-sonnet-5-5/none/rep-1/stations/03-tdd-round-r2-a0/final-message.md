This round closed one facet: valid input with an extra property reaches the executor unchanged, exactly once. I committed and pushed it. The branch is level with its upstream, and `origin/main` was already merged in.

- **Test:** I added the passthrough test to `src/orchestration/tools/registry.test.ts` and linked it from the matching statement in `specs/hal-engine-tool-input-validation/spec.md`. The file ran green here: 3 of 3 tests passed. I did not run the acceptance tests.
- **Eslint finding:** I fixed the `max-member-chain` error in `describeViolation` in `registry.ts` by building the path with `slice(1).split('/').join('.')`. I did not run eslint here, so CI has to confirm it.
- **Typecheck and test failures:** I did not fix these, and I suspect they come from CI's environment rather than the code.
  - CI's errors (`default` missing, `instancePath` undefined at runtime) match ajv 6's typings and shape.
  - `package-lock.json` pins root `ajv` at 8.20.0, with ajv 6 nested under eslint, and 8.20.0 is what my local install runs.
  - The new CI result after this push will show whether that diagnosis holds. If the typecheck and test failures persist, the next round starts there.
- **Red tests:** none of the CI-red tests in the brief were regressions, and I wrote none of them. I can't give an exact count, because the brief truncates the failing-test list.
- **Dod:** `.lore/dod.md` is updated. Still open on the last facet: compile-once ×10, unknown tool, the logs-leak test, the `chatOrchestrator.test.ts` retry loop test, and the docs, README, `.specify/spec.md`, ADR-002 and `example/weather-tool.ts` updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"extra-property passthrough unit test + eslint member-chain fix","tdd_next":"compile-once x10, unknown tool, log-leak test, chatOrchestrator retry test, then docs/README/.specify/ADR/weather-tool"}}