Branch is up to date. Here's what this round fixed:

- **`eslint` — spec.md status**: Changed `| Status | Shipped |` → `| Status | In Progress |` since 2 statements in the "Measured semantics" section still lack test-citation links (the `catch gates onError instanceof Error` assertion and the count-to-11 discrepancy remain unlinked by any test).
- **`eslint` — missing spec links for 4 tests**: Added `([validated by: ...])` entries to the two usage-accumulation statements in `specs/hal-engine-config-hooks/spec.md`, pointing to each `accumulateUsage` helper test by name and line.
- **`eslint` — max-expects violation**: Split the two-assertion `returns the defined value when the other is undefined` test into `returns accumulated value unchanged when next is undefined` (L35) and `returns next value when accumulated is undefined` (L40), each with one `expect` call.
- **`changelog`**: Added a `### Changed` entry under `[Unreleased]` describing the MINOR-bump behaviour change for consumers of `afterModelResponse`.

No regressions written; all tests added/modified were in this branch. One unrelated smell noticed but not touched: the `catch gates onError on error instanceof Error` statement in spec.md still has only a code-reference link, not a test-citation link — a future round could add a test for the "non-Error rejection bypasses onError" path to close it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update changelog and fix ESLint spec-link/max-expects violations","tdd_next":"Make the full build, test, typecheck, ESLint, and Prettier CI checks pass"}}