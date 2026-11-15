Resolved the CI findings from `round-brief.md` and completed the remaining `.lore/dod.md` facet on `loop-bench/95` (`f91fc02`):

- `src/orchestration/onErrorNonError.acceptance.test.ts`: replaced `new Date().toISOString()` in `sessionWith` with `'2026-01-01T00:00:00.000Z'` (`re-lint/no-nondeterministic-tests`) and formatted with Prettier.
- `specs/hal-engine-config-hooks/spec.md`: repointed the two acceptance test citations from `#L52`/`#L63` to `#L53`/`#L64` via `node scripts/check-spec-anchor-names.mjs --fix` (fixes `spec-names` and `re-lint/require-spec-link`).
- `CHANGELOG.md` and `.lore/dod.md`: added the `## [Unreleased]` → `### Fixed` entry and migration note for `hooks.onError` non-`Error` wrapping, verified `bash scripts/check-changelog.sh origin/main`, and ticked the final DoD facet.

The round ran no Jest tests locally (only Prettier, spec anchor/link checks, and the changelog check); 0 red tests were ours and 0 were regressions on the previous CI verdict. `origin/main` is already up to date and `f91fc02` is pushed to `origin/loop-bench/95`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add CHANGELOG.md entry under ## [Unreleased] and resolve CI eslint/spec-names/changelog findings","tdd_next":"acceptance green"}}