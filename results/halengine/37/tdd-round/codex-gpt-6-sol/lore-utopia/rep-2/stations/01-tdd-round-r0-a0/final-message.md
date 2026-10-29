Committed and pushed the static schema compilation round. The new test failed before the change and passed after the refactor. The branch is up to date with `main` and its upstream.

Red tests this round: **1 mine, 0 regressions**. Next facet: validate each function-valued tool definition against its current schema, with validators cached by schema object.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static tool schemas at registration","tdd_next":"Cache and validate function-valued tool schemas by resolved schema object"}}