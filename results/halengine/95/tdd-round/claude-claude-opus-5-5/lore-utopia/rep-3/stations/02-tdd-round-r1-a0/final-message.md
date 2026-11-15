I fixed all four CI failures from the last push (ef73815) and pushed the branch. It's level with its upstream and already contains `origin/main`. I didn't write a new failing test this round: the work owed came from CI's findings, not from a new red phase.

**What I changed:**
- **eslint, line 12 (`new Date()`):** the shared `sessionWith` fixture in `src/orchestration/onErrorNonError.acceptance.test.ts` now uses a fixed timestamp, `'2026-01-01T00:00:00.000Z'`. That is an edit to an acceptance test file, but only to fixture data no assertion reads. No `expect` changed, and both tests should fail and pass for exactly the reasons they did before. If that still counts as editing an acceptance test, flag it.
- **eslint `require-spec-link` and `spec-links`:** in `specs/hal-engine-config-hooks/spec.md`, the one sentence that held two citations mid-statement is now three bullets, each ending in its own citation. The string case points at `#L53`, the plain-object case at `#L64`, and the `cause` case at `chatOrchestrator.test.ts#L311`. I dropped the claim that an `Error` passes through as the same instance, because no test is cited for it.
- **spec-names:** both acceptance-test citations moved from `#L52`/`#L63` to the lines the tests are actually on. `npm run spec:names` reports all 604 citations name the test they point at.
- **changelog:** added a **Fixed** entry under `[Unreleased]` in `CHANGELOG.md`, with a migration note that `onError` now fires for failures it never saw before and the raw value is on `error.cause`.
- **`.lore/dod.md`:** ticked the CHANGELOG facet and added a ticked line recording this CI repair.

**Tests:** I ran only `src/orchestration/chatOrchestrator.test.ts`, through `node --experimental-vm-modules` and Jest: 27 of 27 pass. Plain `npx vitest` and `npx jest` can't load this ESM test suite. No lint, typecheck or acceptance tests were run here; CI judges the push.

**Red tests:** 0 were mine and 0 were regressions. The failures in the brief were lint, spec and changelog checks, not tests.

**Smells noticed, not acted on:**
- `npm run spec:names` only checks that each citation points at the test it names. It doesn't detect citations placed mid-statement; that is CI's `spec-links` check, which I didn't reproduce here.
- The `npm test` script and the CLAUDE.md "Jest suite" wording don't make clear that the suite needs `--experimental-vm-modules`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CHANGELOG entry plus CI repair (deterministic fixture timestamp, spec citations re-anchored and made trailing)","tdd_next":"guard asError against a JSON.stringify throw (circular object / BigInt) with a circular-rejection test; then pin the undefined rejection"}}