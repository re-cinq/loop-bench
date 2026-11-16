Fixed the two CI failures reported on `4807a032f97379648515eeccee18627a2d061786` and closed the final facet in `.lore/dod.md`:

- `src/orchestration/onErrorNonError.acceptance.test.ts`: replaced `new Date().toISOString()` on line 12 with `'2026-01-01T00:00:00.000Z'` to resolve `re-lint/no-nondeterministic-tests`.
- `CHANGELOG.md`: added an entry under `## [Unreleased]` -> `### Fixed` describing `onError` firing for non-`Error` rejections (wrapped in an `Error` with `cause` preserving the raw value while rethrowing the original rejection unchanged) and its consumer migration impact.
- `.lore/dod.md`: ticked the `CHANGELOG.md` facet.

Verified with `npx prettier --write`, `node scripts/repoint-spec-anchors.mjs --check origin/main`, `npm run spec:names`, `npm run check:spec-links`, `npm run check:spec-status`, and `bash scripts/check-changelog.sh origin/main`. The round ran no tests here (and the previous CI run reported 0 red tests of ours and 0 regressions). Committed (`d0c8879`) and pushed to `origin/loop-bench/95`, up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add a CHANGELOG.md entry under ## [Unreleased] and fix CI eslint nondeterministic date finding","tdd_next":"acceptance green"}}