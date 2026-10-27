Implemented and pushed the shutdown synchronization fix.

- Added regression test for awaiting WebSocket close events.
- Updated `createServer.stop()` to await tracked socket closures.
- Updated DoD checklist.
- Focused test passed; no full suite, lint, or typecheck run.
- Branch is pushed and up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"server shutdown waits for tracked WebSocket close events","tdd_next":"acceptance green"}}