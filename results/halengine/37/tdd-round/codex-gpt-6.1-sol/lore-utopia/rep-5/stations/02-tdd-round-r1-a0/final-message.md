Committed and pushed `a4a547c`; branch is synchronized with `main` and upstream.

Closed static-input rejection and repaired reported CI findings. New test: red, then green after refactor. Acceptance tests were not run.

Previous CI reported four failing test files: one prior-round test, three regressions. Next: dynamic-schema validation and caching. No unrelated smells changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject missing required static tool input and repair CI findings","tdd_next":"Validate dynamic tool definitions and cache validators by schema reference"}}