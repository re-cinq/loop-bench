Branch pushed and up to date. The three ESLint failures from the previous round are all fixed:

1. **`re-lint/callee-below-caller`** on `usageAcrossRounds.acceptance.test.ts:21` — moved `scriptedProvider` below `usageHandedToHook` (its caller); the describe block line numbers were preserved at 59/60/70 since the removed and inserted block are the same size.

2. **`re-lint/require-spec-link`** on `orchestratorHelpers.test.ts:29` — added a spec statement to `specs/hal-engine-config-hooks/spec.md` with a `([validated by: adds tokens from both rounds when both report](...#L29))` parenthetical.

3. **`re-lint/require-spec-link`** on `usageAcrossRounds.acceptance.test.ts:70` — added a spec statement with a `([validated by: still counts the rounds that reported when a middle round reports no usage](...#L70))` parenthetical.

No regressions introduced (0 tests written this round; fixes were structural/doc-only).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"No `any` in the public API; eslint/build/typecheck/prettier pass in CI","tdd_next":"acceptance green"}}