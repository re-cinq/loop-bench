Branch is pushed and up to date. This round fixed all CI failures from the last push:

- **ESLint `re-lint/require-spec-link`**: Added 5 spec statements (with test citations) to `specs/hal-engine-config-hooks/spec.md` for the `addUsage` helper tests and the two acceptance tests
- **ESLint `re-lint/max-expects`**: Collapsed the two-expect test at line 39 into a single `toEqual` assertion
- **Changelog check**: Added a `### Changed` entry in `[Unreleased]` describing the new summed-usage behaviour
- **Spec under-counting line**: Replaced the old "under-counts every turn that ran tools" bullet with the new summed-usage statements
- **Version bump**: Updated `package.json` to 0.4.0 (MINOR)

Unrelated smell noticed but not acted on: the "Measured semantics — out of scope" section header still says "This property … This issue changes none of them" (singular "them" is now accurate, but "This issue changes none of them" is slightly odd with one item — minor prose nit, not a defect).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures: spec links, max-expects, changelog, spec under-counting line","tdd_next":"make the hook's usage type say it is a turn total (one-line doc on afterModelResponse in chatOrchestrator.ts)"}}