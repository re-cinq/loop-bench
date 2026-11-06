Branch is up to date with main. The fix addresses all 4 ESLint errors:

1. **Lines 29, 35 (new), 45** — Added a new `## Usage accumulation` section in `specs/hal-engine-config-hooks/spec.md` with `[validated by]` links pointing to each test's exact line number, satisfying `re-lint/require-spec-link` for all three tests.

2. **Line 35 (original two-expect test)** — Split into two separate tests ("returns the defined side when the first operand is undefined" and "returns the defined side when the second operand is undefined"), satisfying `re-lint/max-expects`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"added spec links in spec.md for three accumulateUsage tests and split the two-assert test into two single-assert tests"}}