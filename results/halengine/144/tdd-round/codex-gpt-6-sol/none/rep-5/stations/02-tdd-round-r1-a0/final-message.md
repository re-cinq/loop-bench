Committed and pushed `f652549`. This round added the typed `session_list` response and a handler test that went red, then green after the implementation and refactor. The branch is up to date with `main` and its upstream.

Only the new test was run here; it passes. The previous CI verdict remains red, including lint findings in acceptance tests that I left unchanged. This round has 0 red tests of its own and 0 identified regressions. No unrelated smells were changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add and export the conversation list message types","tdd_next":"Wire sessionStore through createServer"}}