Added the wrong-type rejection test and normalized its message to name the field and expected type without exposing the supplied value. Fixed the two `max-expects` findings and refreshed the spec citations. The focused registry test passed: 4 tests.

Committed and pushed as `01910ee`; the branch is synchronized with its upstream. One red test was mine; zero regressions. Next: remaining registry and orchestrator tests, then the documentation and spec updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrong-type input rejection names the field and expected type without exposing the value","tdd_next":"Remaining registry/orchestrator tests and documentation/spec updates"}}