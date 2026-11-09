Round complete. Summary:

**What this round owed** (from `round-brief.md`, which outranks dod.md): CI's verdict on `0ab5871` was red — two `re-lint/no-duplicate-code` errors in `src/orchestration/onErrorNonError.acceptance.test.ts` (the 9-line projection assertion duplicated between the plain-object and undefined tests, lines 67-75 vs 83-91).

**What it delivered** (commit `e9eb957`, pushed):
- Extracted the duplicated assertion into a shared `expectRejectedThroughOnError` helper (`reason` as a parameter, so each test still asserts its own rejection value and `undefined` semantics are preserved exactly). No assertion changed — this was a lint repair on the acceptance file, not an edit of what it pins.
- Re-pointed the three `#Lnn` spec anchors in `specs/hal-engine-config-hooks/spec.md` by hand (53→69, 64→80, 82→88), since `repoint-spec-anchors.mjs` skips specs authored against the working tree; `check-spec-links.mjs` (0 misplaced) and `check-spec-anchor-names.mjs` (605 citations OK) both pass.
- Appended the closed facet to `.lore/dod.md`. All ticket facets were already ticked; the spec's Status row already reads `Shipped` with the new guarantee, and the CHANGELOG entry landed in a prior round — nothing else outstanding.
- Branch is up to date with `origin/main` (already was), pushed, and `git status` shows it level with its upstream.

**This round ran no tests here**: the only test file touched is the acceptance test, which this pod may not run by name, and eslint is the OOM-risk tool CI runs on every push — its verdict on the push decides.

**Red tests**: 0 mine, 0 regressions — the reported failures were lint errors, not failing tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair eslint no-duplicate-code findings on 0ab5871 (acceptance projection assertion deduped + spec anchors re-pointed)","tdd_next":"acceptance green"}}