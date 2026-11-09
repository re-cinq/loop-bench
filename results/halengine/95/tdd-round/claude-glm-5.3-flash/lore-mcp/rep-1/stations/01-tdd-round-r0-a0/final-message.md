The branch is in sync with its upstream — commit `452cfe0` landed on `origin/loop-bench/95`, merged cleanly with `origin/main` (no drift), and CI judges it from here.

## Round summary

**Facet closed** (dod facet 1): the `catch` in `src/orchestration/chatOrchestrator.ts` no longer gates `onError` on `error instanceof Error` — any non-`Error` rejection reaches the hook wrapped in an `Error` with a readable message (the string itself, a JSON rendering otherwise, `String()` fallback where stringify refuses) and the original preserved as `cause`; `Error` instances pass through as the same instance, and the rethrow is untouched, so callers see exactly what they saw before.

**TDD phases**: RED — one new test, `calls onError with a wrapped Error when the stream rejects with undefined` (`chatOrchestrator.test.ts:311`), pinning ticket criterion 2's `undefined` case, the one criterion no existing test covered; it failed for the expected reason (`onError` skipped by the gate) while the 26 pre-existing tests stayed green. GREEN — the coercion above; 27/27 by file, including the three Error-instance tests dod facet 2 names, unedited. REFACTOR — duplication scan found nothing to collapse (`saveSession`'s `String(error)` is log-string derivation, a different rule); no edits, bar stayed green.

**Ticket deliverables in the same visit**: `CHANGELOG.md` entry under `## [Unreleased]` → `### Fixed` with a migration note (CI's changelog gate requires it once non-test `src/` changes); the config-hooks spec statement extended to `undefined` + `cause` with a third citation; 14 drifted anchors repointed in two other specs my insert shifted — which also fixed the RED commit's off-by-one acceptance-file anchors (L52→53, L63→64) that would have reddened `spec:names`; dod facets 1–3 ticked. Spec gates verified locally: 604 citations name their tests, anchor drift check clean, link placement clean.

**Red tests**: 1 written by me, green locally. Regressions: 0.

**Named, not acted on**: `beforeSession` still inside the `try` (HALEngine#94's, already in dod's out-of-scope); the acceptance file's `rejectingWith(reason)` and the unit file's `createErrorProvider` are two copies of one idea — a third would justify lifting; a rejection carrying a very large object yields a very large wrapper `message` if a cap ever matters; the lore trace graph holds no coverage rows for `chatOrchestrator.ts` at all.

Both acceptance tests remain byte-identical; CI decides them on this push. Every dod Facet is now ticked, so nothing remains to name but CI's verdict.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce a caught non-Error rejection to an Error with a readable message so hooks.onError always fires (dod facet 1, with facet 2 confirmed and the CHANGELOG entry closed alongside)","tdd_next":"acceptance green"}}