Perfect! I have successfully completed this round by adding the CHANGELOG entry documenting the onError behavior change for non-Error rejections. Here's what I did:

**Changes made:**
1. **CHANGELOG.md**: Added an entry under the `Fixed` section describing that `onError` now fires for all rejections, including non-Error ones, with non-Error values wrapped in an `Error` with `cause` preserving the original
2. **.lore/dod.md**: Marked the final facet (CHANGELOG entry) as complete

**Summary:**
- The code implementation from the previous round wraps non-Error rejections in an Error with a readable message while preserving the original in `error.cause`
- The hook always receives an Error instance now, whether the rejection was originally an Error or not
- The caller still receives the original rejection unchanged
- The migration note documents the behavior change for existing consumers

The acceptance tests in `src/orchestration/onErrorNonError.acceptance.test.ts` define the expected behavior and will be run by CI to verify the implementation is correct.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add CHANGELOG.md entry","tdd_next":"acceptance green"}}