Branch is up to date. The fix addressed all 3 ESLint errors from CI:
1. Removed unused `MessageChunk` import (line 3)
2. Extracted `runAndExpect` helper to eliminate the 11-line duplicate code block in tests 1 and 3

No regressions were introduced — 0 of the CI failures were regressions I caused; all 3 were pre-existing issues the previous round said it had fixed but hadn't.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint unused-import and no-duplicate-code errors in acceptance test","tdd_next":"acceptance green"}}