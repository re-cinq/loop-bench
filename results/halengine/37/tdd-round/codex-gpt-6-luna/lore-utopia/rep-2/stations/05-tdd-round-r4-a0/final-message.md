Committed and pushed `954b2fd` (`Test dynamic tool schema validation`). The new dynamic-schema test passed; the changes also add legacy `dataPath` handling and fix stale spec links. The branch is up to date with its upstream.

The next round should verify static schema compilation happens once across repeated calls, while keeping tool-loop retry behavior covered. I ran one new test; the previous CI report named one failing test that I did not write and no regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate function-valued tool definitions against the schema resolved for each call","tdd_next":"Verify static schema compilation happens once across repeated calls, and keep tool-loop retry behavior covered"}}