Perfect. I've resolved the CI failure that was blocking this ticket. The issue was that the test name in `websocketCleanup.test.ts` included a validation link annotation, which doesn't match the pattern used elsewhere in the codebase. Test descriptions should be plain, and validation links should only appear in spec citations.

The change is minimal and focused:
- Removed the embedded validation link from the test name in `src/transport/websocketCleanup.test.ts`
- The spec citation already provides the validation link, so the test name doesn't need it
- The `spec:names` check now passes

The implementation facets in `.lore/dod.md` are all checked off from previous rounds. This round resolved the CI blocker (spec-names validation error) so that the acceptance tests can run properly in the next CI cycle.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI failures resolved","tdd_next":"acceptance green"}}