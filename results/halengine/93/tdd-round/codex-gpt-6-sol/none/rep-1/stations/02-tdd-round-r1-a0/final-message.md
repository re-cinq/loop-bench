Committed and pushed `6f19875`. The hook now names its argument `turnUsage` and exposes the `TurnUsage` type. I also addressed all five lint findings from the previous CI brief without editing the acceptance test. The branch is up to date with `main` and its upstream.

The new test passed locally. It **did not produce a red phase**: Jest erased the type import, so CI’s typecheck must verify that part of the API. The previous CI brief reported zero red tests and zero regressions; it reported lint failures. I left the unrelated `onError` behavior unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Make the hook signature say usage is a turn total","tdd_next":"Delete the obsolete under-counting bullet and re-anchor spec links"}}