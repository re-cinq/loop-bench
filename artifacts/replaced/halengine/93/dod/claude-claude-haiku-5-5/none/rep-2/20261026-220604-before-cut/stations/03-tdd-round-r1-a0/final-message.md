Pushed and up to date. This round fixed all four ESLint errors from CI:

- **`re-lint/no-duplicate-code`** (×2): Extracted the shared `ROUND_TOOL_ONE` and `ROUND_FINAL` constants before the `describe` block, making the two test bodies structurally distinct.
- **`re-lint/require-spec-link`** for `afterModelResponseUsage.acceptance.test.ts:L70` and `orchestratorHelpers.test.ts:L29`: Added `validated by` links for both tests to the spec statement in `specs/hal-engine-config-hooks/spec.md`, and updated the existing link from `#L54` to `#L63` to match the shifted line.

No regressions introduced (0 tests written, 0 regressions). Unrelated smell noticed: `extractStopReason` and `extractUsage` in `orchestratorHelpers.ts` are simple one-liners that could be inlined — not acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint no-duplicate-code and require-spec-link failures from CI","tdd_next":"acceptance green"}}