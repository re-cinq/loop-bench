I have completed the TDD round for ticket #95: "Call onError for a rejection that is not an Error".

1.  **Research:** I identified the `instanceof Error` gate in `src/orchestration/chatOrchestrator.ts` that was causing `hooks.onError` to be skipped for non-`Error` rejections (like strings or plain objects).
2.  **Red Phase:** I created `src/orchestration/onErrorNonError.facet.test.ts` and confirmed that it failed for string and object rejections, as `onError` was not being called.
3.  **Green Phase:**
    *   I implemented an `ensureError` helper in `src/orchestration/orchestratorHelpers.ts` that coerces any unknown rejection into an `Error` object, using `JSON.stringify` or `String()` for the message and preserving the original rejection as the `cause`.
    *   I updated the `catch` block in `src/orchestration/chatOrchestrator.ts` to use this helper before calling `hooks.onError`.
4.  **Refactor Phase:**
    *   I verified that the new facet tests passed and that existing `Error`-instance tests in `src/orchestration/chatOrchestrator.test.ts` remained green.
    *   I added a `CHANGELOG.md` entry documenting the change.
    *   I formatted all changed files using Prettier.
5.  **Delivery:** I committed and pushed the changes to the branch.

All facets in `.lore/dod.md` are now ticked.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerced non-Error rejections in chatOrchestrator.ts","tdd_next":"acceptance green"}}