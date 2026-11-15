Round done: I closed the enum-rejection slice of facet 3, committed `216cdc8`, pushed it, and the branch is level with `origin/main` (nothing to merge).

**What changed**
- `package.json` / `package-lock.json`: `ajv` `^8.20.0` added to `dependencies` (it was present only as a transitive v6 copy before).
- `src/orchestration/tools/registry.ts`: `execute` validates `input` against the resolved `inputSchema` with ajv (`strict: false`, `validateFormats: false`) before calling the executor, and returns `{result: "Invalid input for <tool>: /<path> <message>"}` on failure. The schema is compiled on every call for now; that is the known shortcut the caching facet will replace.
- `src/orchestration/tools/registry.test.ts` (new): one test, an enum-violating input is rejected and the executor is not called.
- `specs/hal-engine-tool-input-validation/spec.md`: added the enum-rejection statement, cited to the new test at `registry.test.ts#L4`. The link is hand-written because `scripts/spec-links/reanchor.mjs` does not exist in this repo.
- `.lore/dod.md`: facet 3 is split into sub-items, the enum one ticked, and the remaining facets listed (register-time compile and `WeakMap` cache, required and wrong-type paths, doc comment, orchestrator tool-loop, version/docs/changelog). Facet 3 itself stays unticked.

**Verification**
- The new test was red before the change (executor ran with `kelvin`) and green after. I ran only `src/orchestration/tools/registry.test.ts` with the repo's Jest runner, since the repo uses Jest rather than the Vitest named in the brief.
- Ran Prettier on the two TypeScript files. No typecheck, lint, or build run in this pod, per the brief.
- The acceptance tests were not run here.
- Red/regression count: no CI verdict exists yet (no round brief), so this round has 0 red tests of my own and 0 known regressions. The lore trace found no existing tests covering `registry.ts` on this branch.

**Choices I made**
- Chose the enum case as the first test because the required-property and wrong-type cases are already covered by the acceptance tests, so a unit test for them would duplicate them.
- `ajv` pinned to `^8` rather than the `ajv` 6.x already hoisted, since the schema-compile API differs.

**Not yet done**
- Compile-at-`register` and per-schema caching; required-property and wrong-type unit coverage; the `execute` doc comment; orchestrator loop test; version bump and docs/changelog.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"execute rejects enum-violating input (ajv validation in ToolRegistry.execute)","tdd_next":"compile static inputSchema at ToolRegistry.register time, throwing naming the tool"}}