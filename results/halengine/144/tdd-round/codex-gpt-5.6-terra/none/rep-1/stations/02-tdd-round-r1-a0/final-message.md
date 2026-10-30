Implemented and pushed `097d961` (`Validate list session paging frames`).

- Validates `limit` and composite `before` cursor; strips client identity.
- Added focused validator test and spec traceability.
- Tick marked in `.lore/dod.md`.
- Focused test passed; 1 intentional red test, 0 regressions identified.
- Branch is merged with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Thread sessionStore into createMessageHandler and wire it in createServer"}}