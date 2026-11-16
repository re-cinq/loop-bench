Branch is pushed and up to date. Summary:

- **RED**: Added a unit test to `chatOrchestrator.test.ts` asserting that throwing a string calls `onError` with an `Error` instance and re-throws the original string — confirmed failing (1 test red, 26 green).
- **GREEN**: Replaced the `instanceof Error` gate with a `toError` helper that passes `Error` instances through unchanged and wraps everything else (`new Error(message, {cause: value})`). All 27 tests now pass.
- **REFACTOR**: No structural changes needed; the helper is small and well-scoped.
- Also added the CHANGELOG entry and ticked all three facets in `.lore/dod.md`.
- 0 regressions, 1 new test written and owned by this round.
- Unrelated smell noticed but not touched: `createErrorProvider` in `chatOrchestrator.test.ts` only accepts `Error`, not `unknown` — mirrors the old gate and would naturally be widened once the acceptance tests confirm everything green, but that is a separate concern.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections to Error before calling onError","tdd_next":"acceptance green"}}