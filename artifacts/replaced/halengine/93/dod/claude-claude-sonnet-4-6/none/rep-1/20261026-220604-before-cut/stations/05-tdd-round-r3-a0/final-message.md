Branch is pushed and up to date. The fix moves `createSession` and `makeCapture` (both `function` declarations) to appear after `runAndCapture` (their caller), satisfying the `re-lint/callee-below-caller` lint rule. No regressions were introduced — the test logic is unchanged, only source order.

Noticed but not acted on: `registryWith` is a `const` arrow function called by `runAndCapture` and was already in the correct relative position — CI didn't flag it, confirming the rule only applies to `function` declarations.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint callee-below-caller ordering in acceptance test","tdd_next":"acceptance green"}}