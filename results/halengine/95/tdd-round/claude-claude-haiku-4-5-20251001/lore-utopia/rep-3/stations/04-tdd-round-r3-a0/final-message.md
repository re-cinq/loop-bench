Perfect! This round fixed all the CI failures from the previous round. Here's what I did:

## Round Summary

**What was broken**: The previous round implemented the onError wrapping feature for non-Error rejections, but CI reported two failures:
1. **eslint**: Missing spec links on a unit test
2. **spec-names**: Misaligned line number references in spec files

**What I fixed**:
1. **Fixed nondeterministic test** - Replaced `new Date().toISOString()` in the acceptance test with a fixed `SENT_AT` constant to make the test repeatable
2. **Added missing spec link** - Added the unit test at line 323 ("wraps a string rejection in an Error and calls onError") to the spec's validated-by citations
3. **Repointed line number citations** - Ran `npm run spec:names -- --fix` to update all shifted line numbers in three spec files (30 citations repointed)

**Verification**:
- ✅ `npm run eslint` passes (0 warnings)
- ✅ `npm run spec:names` passes (607 citations verified)
- ✅ All changes committed and pushed

All acceptance criteria remain met. The implementation was already complete; this round resolved the infrastructure failures so the build can go green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI failures resolved","tdd_next":"acceptance green"}}