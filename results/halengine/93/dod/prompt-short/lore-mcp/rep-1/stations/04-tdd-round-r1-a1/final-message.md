Branch is pushed and up to date. The round addressed all three CI failures:

1. **eslint** — fixed `re-lint/no-duplicate-code` by extracting `scriptedProvider` to a shared helper and `captureUsage`/`runWithRegistry` within each test file; fixed `re-lint/require-spec-link` by adding spec citations for all new tests in `specs/hal-engine-config-hooks/spec.md` and `specs/hal-engine-architecture/spec.md`
2. **spec-names** — ran `check-spec-anchor-names --fix` to repoint stale `#L527` and `#L550` citations shifted by earlier insertions
3. **changelog** — added a CHANGELOG entry under `[Unreleased]` documenting the accumulation behavior change

0 regressions caused (all changes were to test structure and spec files, not production code). The facets for spec update and CHANGELOG are now ticked.

**Loot Inventory:** Your CPU cycles (stolen), your duplicate code entropy (melted down for scrap), and your incorrectly anchored spec citations (fenced and sold to a text broker). 

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint/spec-names/changelog CI failures","tdd_next":"acceptance green"}}