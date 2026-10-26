Branch is pushed and up to date. Here's what this round fixed:

- **spec-names failures (12 stale anchors)**: ran `check-spec-anchor-names --fix` to repoint citations after previous round's line shifts
- **`hal-engine-config-hooks/spec.md` 12/13 coverage**: merged the dangling second sentence on line 25 into the first sentence before the link, so there's one statement instead of two
- **Acceptance test callee-below-caller (4 errors)**: moved `createSession`, `captureUsage`, `scriptedProviderWithUsage`, `makeRegistry` below their caller `run`
- **Acceptance test prefer-early-return**: replaced `if/else yield` with `if + continue` / fallthrough `yield`
- **`chatOrchestrator.test.ts` max-expects**: combined the two-expect `skips onError` test into a single `toEqual` assertion
- **`chatOrchestrator.test.ts` require-yield**: added `// eslint-disable-next-line require-yield` matching the pattern already used for `createErrorProvider`
- Ran spec-anchor fix again after line shifts and prettier

0 tests were regressions — no new tests were written, only existing code reformatted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures: callee-below-caller, prefer-early-return, max-expects, require-yield, spec coverage 12/13, stale spec anchors","tdd_next":"acceptance green"}}