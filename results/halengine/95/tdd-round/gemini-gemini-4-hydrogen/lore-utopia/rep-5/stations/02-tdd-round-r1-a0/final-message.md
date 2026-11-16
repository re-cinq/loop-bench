Resolved both CI findings from `round-brief.md` on branch `loop-bench/95`:

- `src/orchestration/onErrorNonError.acceptance.test.ts:12`: replaced `new Date().toISOString()` with `'2026-01-01T00:00:00.000Z'` to satisfy `re-lint/no-nondeterministic-tests` without altering any test assertions or line numbers.
- `CHANGELOG.md`: added an entry under `## [Unreleased]` (`### Fixed`) describing that `onError` now fires for non-`Error` rejections wrapped in an `Error` preserving `cause` while keeping existing `Error` instances and caller-boundary rejections unchanged.
- `.lore/dod.md`: ticked the `CHANGELOG.md` facet.

Ran Prettier on `src/orchestration/onErrorNonError.acceptance.test.ts`, verified `bash scripts/check-changelog.sh origin/main`, `node scripts/repoint-spec-anchors.mjs --check origin/main`, `npm run spec:names`, `npm run check:spec-links`, and `npm run check:spec-status`. This round ran no Jest tests here (0 tests run locally, 0 regressions introduced); CI evaluates the suite on push. Committed as `b2806a5`, merged `origin/main` (already up to date), and pushed to `origin/loop-bench/95`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint nondeterministic test finding in onErrorNonError.acceptance.test.ts and add CHANGELOG.md entry under ## [Unreleased]","tdd_next":"acceptance green"}}