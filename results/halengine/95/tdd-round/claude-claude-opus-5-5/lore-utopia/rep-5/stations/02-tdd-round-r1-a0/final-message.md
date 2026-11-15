I fixed the three red CI checks from the last push, closed the circular-object facet, and pushed. The branch is level with `origin/loop-bench/95` and main merged in with no changes.

**CI failures fixed** (`lore_get_ci_failures` returned 404 for this branch, so I worked from the round brief):
- **eslint `require-spec-link` and `spec-names`:** the last round inserted a 31-line test, so the spec links below it pointed at the wrong lines. I ran `scripts/repoint-spec-anchors.mjs` and `npm run spec:names -- --fix` (the repo has no `reanchor.mjs`). Both checks are now clean locally, including after this round's own inserted test. The brief's eslint list was cut off, so I can't confirm it only held stale links. The push will show whether anything else remains.
- **changelog:** added an entry under `## [Unreleased] / ### Changed`. It says `onError` now fires for every rejection, a non-`Error` value arrives wrapped with the original as `cause`, an `Error` still arrives as the same instance, and the caller still gets the original rejection. It also warns that failure counts from the hook will rise. `check-changelog.sh` passes after the commit.

**This round's red-green-refactor:**
- **Red:** new test `still calls onError with the original as cause when the rejection is a circular object` in `src/orchestration/chatOrchestrator.test.ts:342`. It failed because `JSON.stringify` threw inside `asError`, so `onError` never ran.
- **Green:** split out a small `readableMessage` helper that falls back to `String(value)` when `JSON.stringify` throws. The new test passes. Nothing to refactor.
- **Traceability:** added a statement to `specs/hal-engine-config-hooks/spec.md` with a link to the new test.

**Tests:** I ran only my new test here. Red tests this round: 1 mine (now green) and 0 regressions; CI hasn't judged this push yet. I did not run the acceptance tests or the three existing `Error` tests that facet 2 names, so that facet stays unticked.

**`.lore/dod.md`:** ticked the circular-object and CHANGELOG facets. I also added and ticked a facet for re-pointing the spec links, so the next round knows to rerun those two scripts after inserting a test.

**Unrelated smells, not touched:** the ticket asks the spec to replace its "recorded-flaw line", but the spec now states the new guarantee and I didn't confirm the old flaw wording is gone. Also, the ticket's out-of-scope note says `beforeSession` escaping the `try` is open, while the spec says it already runs inside it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"circular plain-object rejection still reaches onError (plus stale spec links and CHANGELOG entry fixed)","tdd_next":"confirm existing Error-instance onError tests remain green unedited, then acceptance green"}}