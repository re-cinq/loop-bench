This round fixed the lint error and added one test. I ran only `registry.test.ts`, and its four tests pass. I did not run the acceptance tests, the orchestrator test or lint here. The branch is pushed and `git status` shows it level with upstream. The merge of `origin/main` produced nothing new.

- **Lint fix:** I moved `issuePath` below `describeError` in `src/orchestration/tools/registry.ts`, which clears the `re-lint/callee-below-caller` error CI reported.
- **New test:** `registry.test.ts` now checks that a function-valued tool definition is validated against the schema current at each call. The first call passes with the `city` schema and the second is rejected naming `zip` after the schema changes. I linked it in `specs/hal-engine-tool-input-validation/spec.md`.
- **Spec links:** `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I fixed the `#Lnn` links by hand. They now read L4, L33, L88 and L57.
- **Open CI test failure:** the CI `test` failure was truncated in the brief, and `lore_get_ci_failures` returned no data for this branch. I could not tell which test failed, so it is not addressed. All red tests I could identify were my own; I found no regressions.

**Unrelated smells noticed, not touched:**
- `dod.md` has a stray unchecked bullet duplicating the open facet.
- `src/orchestration/tools/registry.ts` imports Ajv through a hand-written interop cast.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"dynamic-schema per-call validation unit test + callee-below-caller lint fix","tdd_next":"compile-once unit test; orchestrator retry test in chatOrchestrator.test.ts; docs/README/.specify/ADR-002/example/CHANGELOG; spec Status; investigate truncated CI test failure"}}