Branch is pushed and up to date. The round delivered:

- **RED**: `nonErrorCoercion.test.ts` - `coerces a thrown string to an Error before passing to onError` - failed because `capturedError` was `undefined` (the `instanceof Error` gate blocked `onError` for string rejections)
- **GREEN**: Replaced `if (hooks?.onError && error instanceof Error)` with an unconditional `onError` call that wraps non-`Error` values via `new Error(String(error), {cause: error})`
- **REFACTOR**: No structural changes needed; fix is minimal
- **CHANGELOG**: Added the behaviour-change entry under `## [Unreleased] ### Fixed`
- **DoD**: Ticked facets 1 and 3; facet 2 (existing Error-instance tests stay green) is verified by CI

Unrelated smell noticed but not touched: the `consultPolicy` catch in `chatOrchestrator.ts:276` similarly uses `error instanceof Error` for a log message — not a hook seam, so out of scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejection to Error in catch block so onError always fires","tdd_next":"acceptance green"}}