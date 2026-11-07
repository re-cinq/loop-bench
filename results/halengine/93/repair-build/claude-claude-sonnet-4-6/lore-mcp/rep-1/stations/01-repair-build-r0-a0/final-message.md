Pushed successfully. The fixes address all 4 ESLint errors:

1. **`re-lint/max-expects` at line 35** — split the two-expect test into two separate single-expect tests: `returns the right-hand operand when the left-hand is undefined` (line 35) and `returns the left-hand operand when the right-hand is undefined` (line 40).
2. **`re-lint/require-spec-link` at lines 29, 35, 41** — added a "Usage accumulation helper" subsection to `specs/hal-engine-config-hooks/spec.md` with four bullet points, each carrying a `([validated by: ...](path#L))` link pointing to the corresponding test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"added spec links for all three accumulateUsage tests and split the two-expect test into two single-expect tests to satisfy re-lint/require-spec-link and re-lint/max-expects"}}