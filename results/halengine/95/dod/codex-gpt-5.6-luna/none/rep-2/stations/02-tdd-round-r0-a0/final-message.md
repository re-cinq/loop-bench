Branch is pushed and up to date. Summary:

- **RED**: added `wraps a non-Error rejection in Error with cause...` test in the `onError` describe block of `chatOrchestrator.test.ts` — confirmed it failed because `capturedError` was `undefined`
- **GREEN**: changed the `catch` block in `chatOrchestrator.ts` from `if (hooks?.onError && error instanceof Error)` to `if (hooks?.onError)` with normalization — `new Error(String(error), {cause: error})` for non-Error values, same instance for Error values; all 27 tests pass
- **Refactor**: none needed; CHANGELOG updated with the consumer-facing change; all three dod facets ticked

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace instanceof Error gate so every rejection reaches onError, wrapping non-Error values with cause","tdd_next":"acceptance green"}}