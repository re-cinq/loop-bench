Added and pushed the `list_sessions` and `session_list` types, union members, and public exports. Updated the protocol spec citation and checked off the corresponding DoD facet.

The new fixture passed. Jest strips TypeScript types without checking them, so it passed before the implementation too; the compile-time red phase could not be demonstrated without running the prohibited typechecker. Lore’s trace lookup was unavailable. No acceptance tests were run. Red tests: **0 ours, 0 regressions**. The branch is clean and even with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add and export the list_sessions and session_list protocol types","tdd_next":"Validate list_sessions frames"}}