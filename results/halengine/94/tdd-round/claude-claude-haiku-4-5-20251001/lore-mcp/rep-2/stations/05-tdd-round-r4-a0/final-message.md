Perfect! I've successfully fixed the CI failure. Here's what I did:

1. **Identified the CI failure**: The eslint error reported that the test "runs onError and afterSession when it throws" at line 116 of `chatOrchestrator.test.ts` had no spec link.

2. **Added the spec link**: Updated `specs/hal-engine-config-hooks/spec.md` line 20 to add a reference to the test that validates the statement about `beforeSession` throwing.

3. **Verified the fix**: Ran eslint to confirm the error is resolved, and verified prettier formatting is correct.

4. **Committed and pushed**: Created a clean commit with the spec link addition and pushed it to the branch.

The branch is now up to date with its remote, the CI failure is fixed, and all facets in the DOD are marked complete. The acceptance tests can now be verified by CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}