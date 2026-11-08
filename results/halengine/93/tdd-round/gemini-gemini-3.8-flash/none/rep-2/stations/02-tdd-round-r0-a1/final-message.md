Completed the TDD cycle for the facet: "Sum each token field only for provider rounds that report usage, preserving `undefined` when none do."

- Test: added `sums token fields only for provider rounds that report usage, preserving undefined when none do` to `src/orchestration/chatOrchestrator.test.ts`.
- Red phase: 1 red test (the new test), 0 regressions.
- Green phase: restored correct state, all 26 tests passed.
- Traceability: added spec statement to `specs/hal-engine-architecture/spec.md`, reanchored spec references, checked spec links and anchor names.
- DoD: marked facet as completed in `.lore/dod.md`.
- Formatted changed TypeScript files and pushed commit `6450050` to `origin/loop-bench/93`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Preserve the unchanged no-tool regression guard, receives collected response text and usage, in src/orchestration/chatOrchestrator.test.ts."}}