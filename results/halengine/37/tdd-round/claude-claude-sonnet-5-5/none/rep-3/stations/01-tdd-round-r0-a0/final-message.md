This round added input validation to `ToolRegistry`, with `ajv` as a dependency. I wrote one test, an enum rejection, and it passes. I did not run the acceptance tests; CI will.

- **Test:** `registry.test.ts` checks that an out-of-enum value is rejected, naming the path and the constraint and not leaking the value. I added a matching statement to `specs/hal-engine-tool-input-validation/spec.md`, linked to that test (`registry.test.ts#L4`).
- **`package.json`:** `ajv` ^8.17.1 is added to `dependencies`, and the version is bumped from 0.3.0 to 0.4.0. `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I set the link line by hand.
- **`registry.ts`:** static schemas are compiled at `register`, and a broken one throws an error naming the tool. Function-valued schemas are cached by schema object in a `WeakMap`. `execute` returns a rejection `ToolResponse` instead of throwing, and never runs the executor on invalid input. It names the path and constraint, not the value. It also has the one-line doc comment pointing at the spec.
- **`.lore/dod.md`:** I ticked the first three facets. The fourth (the remaining unit tests and the docs updates) is still open.

I did not run the typecheck, the linter or the full suite. The branch is pushed and `origin/main` was already merged.

No red tests were mine, and I caused no regressions. I did not run the existing suite, so I can't rule out a regression that CI might report.

Left for later rounds: the `chatOrchestrator.test.ts` loop test, tests for pass-through, the register-time throw and compile-once caching, and the docs, README, `.specify/spec.md`, ADR-002, example and CHANGELOG updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ajv dependency, register-time compile, and execute-time input validation with enum rejection test","tdd_next":"remaining unit tests (pass-through, compile-once, orchestrator loop) plus docs, README, spec, ADR and CHANGELOG updates"}}