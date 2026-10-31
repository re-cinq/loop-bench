Implemented and pushed static `inputSchema` compilation at registration using Ajv.

- Added a focused red/green unit test; it passes.
- Added Ajv as a runtime dependency.
- Invalid static schemas now throw with the tool name.
- Updated spec traceability and DoD checklist.
- No CI failures were provided; 1 red test was mine, 0 regressions.
- Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"static schema compilation at registration","tdd_next":"cache compiled validators for static and function-valued tool definitions"}}