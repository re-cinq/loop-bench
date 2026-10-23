Perfect! I've successfully fixed the spec-names check failure. Here's what was done:

## Summary

The previous round implemented the aggregate usage feature but left the tests with validation link comments in their names. The spec-names check was failing because it expected test names to match exactly what was quoted in the spec file.

**Fixed:** Removed the `([validated by]...)` comments from 5 test names:
- `chatOrchestratorUsage.acceptance.test.ts`: 1 test
- `orchestratorHelpers.test.ts`: 4 tests

The spec file already contained the correct validation citations, so the test names just needed to be cleaned up to match exactly what the spec was looking for.

**Verification:**
- ✅ `npm run spec:names` passes: 594 citations correctly name their tests
- ✅ Code is formatted (prettier)
- ✅ Changes committed and pushed
- ✅ Branch up to date with origin

All facets in `.lore/dod.md` are checked off, and the previous round reported "Next: acceptance green". The spec-names CI failure is now resolved.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"acceptance green","tdd_next":"acceptance green"}}