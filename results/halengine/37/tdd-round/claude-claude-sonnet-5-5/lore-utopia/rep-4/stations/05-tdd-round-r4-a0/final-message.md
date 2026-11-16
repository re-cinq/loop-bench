This round fixed the one failure CI reported, but I couldn't reproduce it, so the fix is a guess. The change is pushed and the branch is level with its upstream.

CI's `ToolRegistry › rejects a value outside the declared enum without calling the executor` failed because the rejection named `(root)` instead of `/unit`. Locally the test passed on the unmodified code, with and without coverage, because `ajv` 8.20.0 is the top-level install. I can't tell why CI saw an empty `instancePath`. My best guess is that CI loaded Ajv 6, which reports `dataPath` instead. The lockfile does contain a nested `ajv` 6.15.0 under eslint. I made `registry.ts` read either `instancePath` or `dataPath`. The three tests in `registry.test.ts` pass locally. CI's next run will show whether that was the cause.

I wrote no new test. That failing test was my own from an earlier round, so there were no regressions.

Still open in `.lore/dod.md`:
- the dynamic-schema and compile-once tests;
- the orchestrator retry test;
- the docs, README, `.specify/spec.md`, ADR-002, example and CHANGELOG updates;
- the spec Status row.

I did not run the acceptance tests, per the instructions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI enum path-naming failure (Ajv instancePath/dataPath)","tdd_next":"dynamic-schema and compile-once unit tests; orchestrator retry test; docs/README/.specify/ADR-002/example/CHANGELOG; spec Status"}}