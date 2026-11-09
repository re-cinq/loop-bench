Updated the hooks spec and repaired all four reported CI findings. The changes are committed and pushed; the branch is up to date with `origin/main` and its upstream.

No tests were run locally. The remaining spec facet described behavior already implemented in the previous round, so this visit did not produce a new failing test or complete a red-green-refactor cycle. CI reported no red tests: 0 authored tests and 0 regressions.

The existing `onError` gate for non-`Error` throws and usage accounting across tool rounds remain out of scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Clarify the setup-failure guarantee and repair CI findings","tdd_next":"acceptance green"}}