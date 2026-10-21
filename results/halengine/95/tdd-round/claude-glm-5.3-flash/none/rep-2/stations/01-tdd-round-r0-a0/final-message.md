Round complete and pushed.

**What this round did (green phase — the RED acceptance tests were already committed at `64143f7`):**

- **Code**: removed the `error instanceof Error` gate in the `catch` at `src/orchestration/chatOrchestrator.ts:149`. `hooks.onError` now fires for every rejection; a new `asError` helper passes `Error` instances through as the same instance and wraps anything else in an `Error` whose `message` is the thrown string (or a JSON rendering of the value, `String()` as the fallback for circular structures) with the original preserved as `cause`. The rethrow is untouched, so the caller still receives the original rejection.
- **Test run**: ran only `src/orchestration/onErrorNonError.acceptance.test.ts` — 2 passed, 2 total, after the change (they were the round's red bar).
- **Traceability**: repaired the previous round's rotten anchor in `specs/hal-engine-config-hooks/spec.md` (`#L63` landed on a blank line — `repoint-spec-anchors.mjs --check` reported it rotten) and aligned both links to the `it` declaration lines (`#L53`, `#L64`) per the repo's convention. `check:spec-links` is clean; the spec's `Status` row already reads `Shipped`.
- **CHANGELOG**: entry added under `## [Unreleased]` → `### Fixed`, with a migration note (`error.cause` can now be any shape).
- **`.lore/dod.md`**: ticked both acceptance entries and facets 1 (coercion) and 3 (CHANGELOG). Facet 2 — existing `Error`-instance tests staying green unmodified — is left unticked for CI to confirm; every one of those tests passes an `Error` instance, which takes the pass-through branch.
- **Delivery**: prettier run over the changed source file (unchanged — already formatted); no lint, typecheck, or build run here per pod policy. Committed `4424a14`, pushed; `origin/main` merged in (already up to date); `git status` reports the branch up to date with `origin/loop-bench/95`.

Red tests: the 2 that were red at round start were the previous round's acceptance tests, now green — I wrote no new test this round. Regressions: none named. No unrelated smells noticed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"onError coercion for non-Error rejections (acceptance tests green locally, changelog + spec anchor closed)","tdd_next":"CI verdict on the push: confirm existing Error-instance orchestrator tests stayed green unmodified and the full verify chain passes; acceptance green if so"}}