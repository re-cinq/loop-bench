Committed and pushed the round. Static tool schemas now compile at registration, and an invalid schema names its tool in the error. The new unit test failed before the change and passed afterward. I did not run acceptance tests; the pushed branch is up to date with its upstream.

Red tests remaining from this round: 0 ours, 0 known regressions. CI has not judged this push yet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static ToolDefinition.inputSchema at registration time","tdd_next":"Cache validators for function-valued tool definitions by schema object reference"}}