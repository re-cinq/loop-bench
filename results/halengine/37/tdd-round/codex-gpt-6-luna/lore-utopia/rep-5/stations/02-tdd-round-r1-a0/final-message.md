Committed and pushed `37557a8` (`Preserve schema compilation causes`). The focused test failed first because the cause was missing, then passed after the fix. Formatting and the final diff check passed; I did not run typecheck, lint, or acceptance tests.

The round closed cause preservation. Next: add dedicated tests for static compilation and function-valued schema caching. One intentional red test; zero regressions identified. The previous CI test failure details were truncated in the brief, and Lore could not retrieve them for this branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"preserve schema compilation errors as the cause of registration errors","tdd_next":"test static schema compilation and function-valued schema caching"}}