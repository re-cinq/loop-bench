Committed and pushed `416fd67` (`feat(ws): define list sessions frames`).

Added protocol frame types/exports and bare `list_sessions` validation with `userId` stripping. The new focused test passed; 1 red test was mine, 0 regressions. Acceptance tests were not run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add list_sessions/session_list protocol frame types and exports","tdd_next":"Validate list_sessions limit and before constraints"}}