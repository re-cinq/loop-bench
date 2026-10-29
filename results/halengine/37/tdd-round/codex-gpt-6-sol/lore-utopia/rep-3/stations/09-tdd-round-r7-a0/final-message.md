Committed and pushed one red-green-refactor round (`1426ca4`). The new test exposed a collision when distinct dynamic schemas reused a JSON Schema `$id`; the registry now compiles them independently, and the focused test passes. I also repaired stale spec links reported by CI. The branch is synchronized with its upstream.

Red tests this round: **1 mine, 0 identified regressions**. The previous CI brief truncates its test failure details, so that failure remains unclassified. No unrelated smells were changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate distinct dynamic schemas that reuse a JSON Schema identifier","tdd_next":"remaining unit tests and documentation updates"}}