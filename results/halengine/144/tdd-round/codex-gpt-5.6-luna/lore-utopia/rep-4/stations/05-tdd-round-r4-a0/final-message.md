Implemented and pushed commit `df7ff2b`.

- Added enabled `list_conversations` WebSocket handling and ISO serialization.
- Added history config threading and `UNSUPPORTED`.
- Added one traceable test; it passes.
- Formatter run; no lint/typecheck/full suite run.
- Branch is synchronized with upstream.

The prior acceptance-test lint/spec-link findings remain because acceptance tests must not be edited.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle enabled list_conversations frames over WebSocket","tdd_next":"acceptance green"}}