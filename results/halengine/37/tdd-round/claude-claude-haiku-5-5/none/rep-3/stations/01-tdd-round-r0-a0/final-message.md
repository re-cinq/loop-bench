This round closed the first half of facet 2: static `inputSchema` is now compiled at `register`, and an invalid schema throws an error naming the tool. The work is committed and pushed to `loop-bench/37`, and the branch is in sync with its upstream after merging `origin/main` (no conflicts).

**Round summary**
- **Red:** wrote `src/orchestration/tools/registry.test.ts` with one test, "throws at register time naming the tool when a static inputSchema cannot be compiled". It failed because `register` accepted the schema.
- **Green:** `registry.ts` now compiles static schemas with `ajv` (`strict: false`, `validateFormats: false`) in `register`, and rethrows with the tool name. The test passes.
- **Refactor:** none needed beyond the minimal change. The `validate` field on the stored tool is set but not read yet; `execute` validation is facet 3.
- **Dependency:** added `ajv@^8.20.0` to `dependencies` (not peer or dev) with `--ignore-scripts`, so `prepare` did not run a build. `package-lock.json` is updated.
- **Spec:** added a second `([validated by ...])` link on the static-compile statement in `specs/hal-engine-tool-input-validation/spec.md`, pointing at the new test at `registry.test.ts#L4`. The status row stays "In Progress" because the ticket is not complete.
- **dod.md:** ticked the compile facet. Split the rest into two unchecked facets: the `WeakMap` cache for function-valued sources, and the `package.json` MINOR version bump to 0.4.0. Facet 1 (`ajv` in deps) is only partly done because of the version bump, so it stays open.

**Not verified in this round**
- I ran only my own test file, with `node --experimental-vm-modules node_modules/jest/bin/jest.js`. I did not run the acceptance tests, the full suite, lint, the typechecker, or the build.
- No `round-brief.md` existed, so there was no CI verdict to act on.
- The `lore_*` tools were not available in this session. I could not run `lore-query-trace` before editing `registry.ts`, so I have no coverage list to check for regressions. Both the registry and orchestrator paths have existing coverage I did not inspect.
- Red and regression counts: one red test was mine (now green). No regressions are known, but none were checked against CI.
- Prettier was run on the two changed TypeScript files and reported them unchanged.

**Smells noticed, not touched:** `ajv@6` is still in the lockfile as a transitive dependency of eslint, which is harmless but worth a look later.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"compile static inputSchema at ToolRegistry.register (ajv, throws naming the tool)","tdd_next":"validate input in ToolRegistry.execute before the executor runs"}}