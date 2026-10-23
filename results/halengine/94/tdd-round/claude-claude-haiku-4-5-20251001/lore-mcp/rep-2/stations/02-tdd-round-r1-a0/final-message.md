Perfect! I've completed all the work for this round. Let me summarize what was accomplished:

## Round Summary

I fixed CI failures from the previous round and completed the remaining facets for ticket #94:

### Fixed CI Failures:
1. **Acceptance test errors** — Corrected `PromptBuilder` configuration to use the correct `identity` property instead of non-existent properties, and consolidated multiple expect calls into a single assertion to comply with the `max-expects` lint rule.

2. **Missing spec links** — Added spec statements to three spec files to satisfy the `spec-link` linter requirements:
   - `hal-engine-config-hooks/spec.md`: Added statements validating tests for `afterSession`, `onError` behavior, and hooks being optional
   - `hal-engine-tool-budget/spec.md`: Added statement validating tool budget enforcement
   - `hal-engine-tool-responses/spec.md`: Added statement validating entry index rewriting

### Completed Remaining Facets:
3. **Updated spec** — Removed the `beforeSession` behavior from the "out-of-scope measured semantics" section since it's now an implemented and specified guarantee.

4. **Updated CHANGELOG** — Added entry documenting the change: `beforeSession` now fires inside the `try` block so errors invoke `onError` and `afterSession` hooks, with migration guidance for existing consumers.

All facets in `.lore/dod.md` are now marked complete. The acceptance test validates that when `beforeSession` throws, the error propagates to the caller while both `onError` and `afterSession` hooks are invoked.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec and CHANGELOG updates","tdd_next":"acceptance green"}}