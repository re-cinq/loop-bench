Round complete. The branch is in sync with `origin/loop-bench/95` and up to date with `origin/main`.

## What this round did

**RED** — one new unit test in `src/orchestration/chatOrchestrator.test.ts:311`, `reports a thrown string to onError as an Error carrying it as cause and rethrows the string` (the smallest facet of dod facet 1; it also pins the `cause` contract and rethrow identity, which no acceptance test pins). Confirmed red for the right reason: `calls: 0`, `reportedMessage: undefined` — `onError` skipped by the `instanceof Error` gate while the string still propagated.

**GREEN** — the least code in `src/orchestration/chatOrchestrator.ts`: the catch now calls `onError` on every rejection, wrapping a non-`Error` via a two-line `asError` (readable `message`, original preserved as `cause`); `throw error` is untouched, so the caller sees exactly what it saw before, and an `Error` reaches the hook as the same instance. Final bar: **27/27 green** — including the three pre-existing `Error`-instance tests, unmodified (dod facet 2).

**REFACTOR** — nothing to collapse: the `instanceof Error ? …` extractions in `saveSession`/`logger` produce log strings, not `Error` instances — different knowledge, one caller each.

**Deliverables**: spec `specs/hal-engine-config-hooks/spec.md:19` now names the `cause` and carries my test's citation (the anchor fixer repointed 17 links my insertion shifted; all 604 citations verified name-accurate); CHANGELOG entry added under `## [Unreleased]` → `### Fixed` with a migration note (dod facet 3); `.lore/dod.md` ticks the three closed facets. Prettier ran on the changed `.ts` files (both already clean). No lint, no typecheck, no build, no acceptance-test run — CI's to judge.

**Status**: 0 red tests are regressions; the only red test this round was mine, now green. The two acceptance tests in `src/orchestration/onErrorNonError.acceptance.test.ts` should turn green on CI (same code path covers string and plain object). No round brief existed, so no CI findings were owed.

**Noted, not acted on**: (1) the `undefined` rejection case from ticket criterion 2 is handled by the code but pinned by no test — appended to dod.md as the open facet; (2) `lore-query-trace` was unavailable in this pod, so covering tests for the edited file were enumerated by grep; (3) three near-identical `instanceof Error ? …` message extractions exist across `consultPolicy`, `saveSession` and `logger.ts` — a shared helper becomes worth it only on a third real caller.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections to an Error so onError always fires, with CHANGELOG + spec citation","tdd_next":"pin the undefined-rejection case, or acceptance green if CI is satisfied"}}