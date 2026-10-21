Round complete and pushed. Summary:

**The round (strategy `direct`, one red-green-refactor cycle)**
- **Red**: wrote one test in `src/orchestration/chatOrchestrator.test.ts` — `wraps a non-Error rejection so onError receives an Error carrying the original as cause` — pinning the `cause` guarantee the acceptance file leaves out (ticket criterion 1). It failed for exactly the right reason: `onError` never fired (`onErrorGotError: false`) while the caller still saw the raw `'string boom'`.
- **Green**: `src/orchestration/chatOrchestrator.ts:150` — the `catch` now calls `hooks.onError(session, asError(error))`; `asError` passes an `Error` through unchanged and wraps anything else with a readable `message` (string itself, `JSON.stringify` for objects, `String` fallback guarded against circular values) and the original as `cause`. `throw error` is untouched, so the caller boundary is byte-identical. Ran the file: 27/27.
- **Refactor**: nothing needed — the bar is green and the two helpers are the least code that reads.

**Also closed (consequent facets 2 and 3)**: the three existing `Error`-instance tests named in the DoD ran green in the same file, unedited (only the shared `createErrorProvider` helper's parameter type widened `Error` → `unknown` so a non-Error rejection is expressible; no test body changed); the acceptance test file is untouched. CHANGELOG gained a `### Fixed` entry under `## [Unreleased]` with a migration note. Spec statement updated with the `cause` guarantee and my test's citation; `dod.md` ticks three facets and records one new unchecked one.

**Traceability note**: no `scripts/spec-links/reanchor.mjs` exists here; the repo's equivalent, `check-spec-anchor-names.mjs --fix`, repointed 17 citations by name. That also cured a latent rot: the previous round's two acceptance-test citations pointed one line above their `it(` declarations (the `describe(` line and a blank line); they now land correctly, and `spec:names` exits clean.

**Red tests**: 1 red test was mine (by design, now green). **Regressions**: 0.

**Smells noticed, not acted on**: `saveSession` still renders caught values with `String(error)` while the new `readableMessage` uses JSON-first — a log-line inconsistency, out of scope. `lore-query-trace` / `lore_get_ci_failures` had no tooling in this pod (no lore CLI, no round brief), so CI's verdict on the previous push was not readable here; the two acceptance tests were not run locally — CI judges the push.

Commit `a887884` pushed; branch up to date with `origin/loop-bench/95` and already even with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"onError fires on every rejection inside the try: non-Error rejections reach the hook wrapped with the original as cause (facets 1-3)","tdd_next":"pin the undefined-rejection case (new unchecked facet), else acceptance green"}}