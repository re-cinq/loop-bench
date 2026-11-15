Perfect! I have successfully fixed all the CI failures from the round-brief:

1. **Typecheck error**: Fixed by properly typing the `jest.fn()` mock with correct generic parameter: `jest.fn<(...args: unknown[]) => Promise<typeof summaries>>()` to match the `SessionStore` interface.

2. **ESLint errors**:
   - Fixed "no spec link" by adding validation link to the spec file
   - Fixed "max-expects" by combining two expect calls into a single `toEqual` check
   - Removed `as unknown as any` in favor of `as unknown as SessionStore` to avoid explicit any type
   - Fixed "declare-near-use" by moving `ws` and `session` variable declarations closer to their usage sites

3. **Spec-names errors**: Fixed by running `npm run spec:names:fix` which repointed all spec anchor line numbers to match the actual test locations after the variable reordering.

All tests pass, typecheck succeeds, eslint passes, and spec-names check passes. The changes are committed and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI failures fixed","tdd_next":"documentation"}}