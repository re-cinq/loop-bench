Committed and pushed `dc166a2`.

- Added cursor-field normalization regression coverage; it passes.
- Fixed the reported validation type/lint failures.
- Documented `list_sessions` / `session_list` and checked the final DoD facet.
- Branch is merged with `origin/main` and not ahead.

This round had 1 intentional red test and 0 independent regressions identified; the CI optional-peer failure was downstream of the prior build/type failure.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in the protocol specifications; normalize validated list_sessions cursor fields","tdd_next":"acceptance green"}}