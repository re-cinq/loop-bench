Pushed and in sync with upstream; `origin/main` merge was a no-op.

## Round summary

**Facet closed (RED → GREEN → REFACTOR):** `hooks.onError` now fires for every rejection inside the turn. The `instanceof Error` gate in `src/orchestration/chatOrchestrator.ts:150` is gone; the catch calls `toError(error)` — a new pure helper in `orchestratorHelpers.ts` that passes an `Error` through as the same instance and wraps anything else in an `Error` with a readable message (the string itself; `JSON.stringify` for objects, with a `String()` fallback so `undefined` and circular values can't make the error path throw) and the original as `cause`. The re-thrown value is untouched, so the caller sees exactly what it saw before.

- **Test written (1):** `wraps a non-Error rejection in a readable Error carrying it as the cause, and passes an Error through as itself` in `src/orchestration/orchestratorHelpers.test.ts:29` — red for the expected reason (no `toError` export), then green; 5/5 in that file.
- **Facet 2 confirmed:** `chatOrchestrator.test.ts` ran green, 26/26, unedited — including the three named `Error`-instance tests.
- **Also closed:** `CHANGELOG.md` entry under `## [Unreleased] → Fixed` (migration note for existing consumers); repointed the two spec citations the RED commit left off their declarations (`#L52`→`#L53`, `#L63`→`#L64` — `npm run spec:names` would have failed the build on those) and cited the new unit test on the same statement. `.lore/dod.md` facets ticked; the two acceptance boxes stay unticked for CI's verdict.
- **Tests run here:** my file (red then green) and `chatOrchestrator.test.ts`. The acceptance test file was not run — CI judges it. Red tests: 1, mine, now green. Regressions: 0.
- **Smells noticed, not acted on:** `saveSession` and `consultPolicy` each re-derive their own non-`Error` rendering for logging — different rules from the hook coercion, left alone. The ticket's `undefined`-rejection case is implemented but pinned by no acceptance test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections to an Error so onError always fires, with CHANGELOG entry and spec citations repointed","tdd_next":"acceptance green - CI verdict on the two onErrorNonError acceptance tests, then tick their dod boxes"}}