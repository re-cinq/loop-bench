Fixed legacy validation error paths so bracket-quoted property names are reported with JSON Pointer escaping. The focused test failed before the change and passed afterward. The commit was pushed, and the branch is up to date with `origin/main` and its upstream.

CI’s prior test-suite timeout remains unresolved: its truncated log shows a Vertex constructor stack but does not identify the cause. The visible report named no red tests: 0 were mine and 0 were identified regressions. The Lore coverage-query tool was unavailable, so existing coverage could not be checked through the graph.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Escape bracket-quoted legacy validator paths","tdd_next":"Investigate the CI test-suite timeout"}}