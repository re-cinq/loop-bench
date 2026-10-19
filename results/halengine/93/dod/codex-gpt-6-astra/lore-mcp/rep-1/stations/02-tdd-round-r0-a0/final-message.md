Pushed and up to date. 0 regressions (my test + 24 prior orchestrator tests all green).

Unrelated smells noticed but not acted on:
- The existing `chatOrchestrator.test.ts` test `'keeps the usage an earlier round reported when a later round reports none'` (line 527) now tests a narrower behavior than before — it only checks that a single earlier round's usage survives when the later round has none, but doesn't verify the accumulation. It stays unedited per DoD.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate each provider call's usage within the turn, preserving undefined when nothing reports","tdd_next":"Keep `receives collected response text and usage` green (confirmed) + make public hook signature explicitly describe a summed turn total; then CHANGELOG/spec updates; then CI"}}