Round 2 is pushed to `loop-bench/37`. The branch shows no commits ahead of its upstream, and the merge with `origin/main` needed nothing.

**CI findings from the last push**
- **typecheck (fixed):** `registry.ts` used the default `Ajv` import, which CI resolved to the wrong typings. I switched it to the named `{Ajv}` export, which the installed ajv 8.20 provides at runtime and in its typings. I could not run `tsc` here, so CI is the check on this.
- **changelog (fixed):** added an `[Unreleased]` entry in `CHANGELOG.md` for the register-time schema check.
- **test (not fixed here):** the failure list in the brief is truncated, so I could not map every red test. The acceptance tests are still red for the facets not yet written. I did not run them.
- **eslint (not fixed, needs a decision):** both findings are in `registry.acceptance.test.ts` (lines 141 and 143: `prefer-early-return` and `max-member-chain`). Fixing them means editing an acceptance test, which this round is not allowed to do. Someone needs to decide whether the test can be restructured for lint without changing what it asserts.

**This round's TDD cycle (facet: compile static `inputSchema` at `register`)**
- **Red:** added `throws at register time naming the tool for a static inputSchema that does not compile` to `registry.test.ts`. It failed because `register` accepted the broken schema.
- **Green:** `register` now calls `ajv.compile` on static schemas and throws `Invalid inputSchema for tool <name>: …`. Function-valued sources are not compiled at register time.
- **Refactor:** nothing needed.
- **Tests run here:** `registry.test.ts` only, with `node --experimental-vm-modules node_modules/jest/bin/jest.js`, which is the repo's own `npm test` flag. Result: 2 of 2 passed. The second test is the existing enum test.
- **Spec and docs:** the statement in `specs/hal-engine-tool-input-validation/spec.md` now carries a second link to my test. The spec status stays `In Progress`.
- **dod.md:** ticked the register-time sub-facet. The parent facet stays open because the WeakMap cache for function sources is still missing.

**Regressions:** none of the tests I ran were red, so I have no regressions to report. I did not check CI's full list of red tests, because the brief truncates it.

**Open items I did not touch:** the version bump to MINOR, the README, the adding-a-tool doc, `.specify/spec.md`, the orchestrator tool-loop test, and the WeakMap cache.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"static inputSchema compiled at register time (throws naming the tool)","tdd_next":"WeakMap cache for function-valued sources and required/wrong-type rejection messages"}}