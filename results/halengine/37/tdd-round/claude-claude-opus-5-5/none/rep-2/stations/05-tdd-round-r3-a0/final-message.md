I fixed the two lint errors CI reported, added a test that a static tool's schema is compiled only once, and pushed it to `loop-bench/37`. The branch is level with origin, and merging `origin/main` brought in nothing new.

**CI's red build (eslint)** — both errors were in `src/orchestration/tools/registry.ts`:
- **Line 60:** a two-line comment, which the one-line comment rule rejects. I shortened it to one line.
- **Line 79:** the error thrown for a schema that won't compile didn't attach the original error. It now passes `{cause: error}`.

CI hasn't checked this push yet.

**This round's facet** — a static tool's schema is compiled once across ten `execute` calls:
- The new test is in `src/orchestration/tools/registry.test.ts`. It watches the validator library's `compile` method, registers a static tool, calls `execute` ten times, and checks there was exactly one compile.
- The existing code already does this, so the test passed straight away. To show it can fail, I briefly changed `execute` to skip the validator built at `register`. The test then failed (2 compiles instead of 1). I put the code back, and all 5 tests in the file pass.
- No new production code was needed beyond the two lint fixes, and nothing needed refactoring.

**Spec links:** I added the new test's citation to the "compiled at `register` time and reused on every `execute` call" statement in `specs/hal-engine-tool-input-validation/spec.md`. Adding the test moved the other tests in that file down, and the repo has no script to update the links, so I fixed the other four line links by hand (L22→24, L33→35, L56→58, L74→90). The spec stays "In Progress" and the facet is ticked in `.lore/dod.md`.

**Red tests:** one was mine (the mutation check). There were no regressions; CI's only failures on the previous push were the two lint errors above. I couldn't ask which existing tests cover `registry.ts` because that tool isn't available in this pod.

**Smells noticed, left alone:** none beyond the ticket's scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"A static tool's schema is compiled once across ten execute calls (pinned by a test)","tdd_next":"Pin extra properties pass through unchanged exactly once, Unknown tool still throws, and the orchestrator rejected-then-corrected retry in chatOrchestrator.test.ts"}}