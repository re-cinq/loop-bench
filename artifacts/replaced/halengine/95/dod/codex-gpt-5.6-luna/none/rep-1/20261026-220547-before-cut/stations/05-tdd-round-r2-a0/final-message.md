All facets in dod.md were already checked. This round fixed the two remaining CI failures:
- **`re-lint/no-duplicate-code`**: Extracted `captureOnErrorArg`, `countOnErrorCalls`, and `captureCallerRejection` helpers from the 7 test bodies, eliminating the repeated orchestrator setup blocks
- **`re-lint/require-spec-link`**: Added 7 sub-bullet spec statements to `specs/hal-engine-config-hooks/spec.md` with validated-by links pointing to the exact post-Prettier line numbers of each test

0 regressions introduced (pure structural refactoring, no behavior changes). 0 tests written (CI repair round, not a new facet).

Unrelated smell noted: the describe-level spec link at L74 is a documentation pointer to a `describe()` block, not an `it()` block, so it doesn't technically cover any test under the re-lint rule's span-overlap check — it's decorative but harmless.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair: re-lint/no-duplicate-code and re-lint/require-spec-link","tdd_next":"acceptance green"}}