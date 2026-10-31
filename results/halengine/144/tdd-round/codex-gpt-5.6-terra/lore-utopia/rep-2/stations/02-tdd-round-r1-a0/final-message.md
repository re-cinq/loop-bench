Implemented and pushed validator support for `list_sessions` frames, including cursor validation and unknown-field stripping. Focused validator test passes.

One red test was mine; no regressions were identified in the focused run. Existing CI lint findings in acceptance tests remain for later handling.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Thread sessionStore into createMessageHandler and wire it in src/transport/createServer.ts"}}