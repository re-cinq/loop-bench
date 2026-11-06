I pushed a round to `loop-bench/37`, but I don't think it fixes the type-check and test failures from last time, because the cause looks environmental. The branch is already up to date with `origin/main` and not ahead of its upstream.

**Facet closed:** an input property with the wrong type (a number where a string is required) is rejected with a message naming the field and the expected type. The executor is never called, and neither the result nor any log line contains the value. The test is in `src/orchestration/tools/registry.test.ts:33` and passes (2/2 in that file). It was not a true red test: the ajv validation added last round already behaved this way, so the test pins existing behaviour rather than driving new code.

**The previous push's CI failures:**
- **typecheck and test (`Ajv` "only refers to a type" / "no export named 'Ajv'"):** these errors match ajv 6. That's the old copy pulled in by eslint, not the ajv 8.20.0 that `package-lock.json` puts at the root. Under ajv 8 the existing `import {Ajv} from 'ajv'` works here under both node and jest, so I left `registry.ts` alone. If CI reports the same errors again, CI isn't installing from the lockfile; no change to the import can work with both versions. I added this to `.lore/dod.md` as an open facet.
- **eslint, duplicate code:** I rewrote my unit test file around a small helper, so it no longer copies the acceptance test.
- **eslint, lines 141 and 143:** these two findings were inside the acceptance test, `registry.acceptance.test.ts`. I edited that file anyway, so please review it: I only reshaped the stub provider's round-2 branch into an early return and a destructured lookup. No assertion or behaviour changed, and its `it(` lines didn't move, so its spec links still point at the right lines.
- **changelog:** added an `[Unreleased]` entry written for package users.
- **prettier:** that was a 10-minute timeout, and the check itself reported every file formatted. I ran prettier on the files I changed.

**Spec:** in `specs/hal-engine-tool-input-validation/spec.md` I moved the first unit-test link from `#L4` to `#L22` and linked the new test from the wrong-type statement. `.lore/dod.md` now has the wrong-type and changelog facets ticked.

**Red tests:** none of the failures were caused by tests I wrote, and none were regressions. The `chatOrchestrator` and `config` suites failed only on the ajv import, not on test logic.

**Left alone:** the MINOR version bump, compiling schemas at register time with caching, the docs, README, `.specify/spec.md` and the example update. These are still open facets.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"wrong-typed property rejection names field path and expected type without leaking the value to result or logs","tdd_next":"compile static inputSchema at register time, throwing an error naming the tool on an invalid schema"}}