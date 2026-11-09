Committed and pushed `026b959`; branch is current with `origin/main` and its upstream.

One test went red, then passed after implementation and refactoring. Fixed both reported CI findings. No regression test failures were reported; existing tests remain unrun locally.

Next: dynamic schema caching. No unrelated smells noted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Enum rejection diagnostics without supplied values; repair CI options typing and duplicate setup","tdd_next":"Cache dynamic schema validators by object reference"}}