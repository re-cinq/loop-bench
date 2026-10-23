## Summary

This round fixed a CI blocker (`spec-names`) that was preventing the acceptance test from being properly validated. The previous round updated `specs/hal-engine-config-hooks/spec.md`, which shifted line numbers in subsequent specs and broke 24 test-citation anchors.

**What I did:**
1. Ran `npm run spec:names -- --fix` to reanchor all 24 broken citations to their current line numbers
2. Verified the spec citations are now correct (all 593 citations validated)
3. Committed the spec updates with attribution
4. Pushed to origin and confirmed the branch is up to date with main

The implementation is complete from the previous rounds:
- ✅ `beforeSession` moved inside the `try` block
- ✅ Spec updated with the new guarantee
- ✅ CHANGELOG documented for consumers
- ✅ Acceptance test written and properly cited

CI will now verify that the acceptance test `runs onError and afterSession when beforeSession throws` passes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI blocker (spec-anchor-names)","tdd_next":"acceptance green"}}