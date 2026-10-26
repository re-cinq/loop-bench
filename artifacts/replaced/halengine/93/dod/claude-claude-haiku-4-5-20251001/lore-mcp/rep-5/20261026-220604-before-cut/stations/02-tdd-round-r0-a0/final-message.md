Branch is pushed and up to date. Summary of this round:

- **RED**: Added 4 tests for `accumulateUsage` in `orchestratorHelpers.test.ts` — failed because the function didn't exist.
- **GREEN**: Added `accumulateUsage` to `orchestratorHelpers.ts` (sums token fields, handles `undefined` gracefully); updated `chatOrchestrator.ts` to call `accumulateUsage(lastUsage, outcome.usage)` instead of `outcome.usage ?? lastUsage`. All 8 tests pass.
- **Refactor**: Nothing to clean up; the helper is a clean, pure function.
- Also updated `specs/hal-engine-config-hooks/spec.md` to replace the under-counting statement with the new accumulated behavior, added CHANGELOG migration note, and ticked 3 DoD facets. The type-signature facet remains (the `usage?` parameter is already typed correctly as `UsageMetadata | undefined`; CI may judge whether an explicit `totalUsage` rename is needed).

Unrelated smells noticed (not acted on): the `// Bounded by the budget gate below` comment in `chatOrchestrator.ts` references a constraint that's explained implicitly — could be removed, but that's out of scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate usage across all tool rounds in afterModelResponse","tdd_next":"Update type signature of afterModelResponse hook parameter to make it unambiguous (or verify acceptance green)"}}