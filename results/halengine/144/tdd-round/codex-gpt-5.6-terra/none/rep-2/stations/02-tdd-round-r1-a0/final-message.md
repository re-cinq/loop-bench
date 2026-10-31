Validated and normalized `list_sessions` pagination frames, preserving only defined fields and rejecting malformed cursors. Moved the misplaced types-layer test and updated the spec citation/checklist.

Focused test passed: `src/transport/ws/validation.test.ts`.

This round: 1 red test written; 0 regressions observed. Existing acceptance-test CI findings remain for later facets.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Thread sessionStore into createMessageHandler and createServer"}}