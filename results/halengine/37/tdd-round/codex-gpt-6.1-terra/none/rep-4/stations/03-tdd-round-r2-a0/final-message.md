Implemented and pushed input validation before tool execution. Rejections return the failing path and constraint to the model, and dynamic schemas use the cached validator for the current schema.

The new required-field test failed before the change and passed afterward. The previous CI excerpt showed one red registry test from Ajv resolution and a Vertex provider test failure whose error was truncated; the Vertex files match the base branch. I could not establish whether that failure was a regression. The trace gateway was unavailable, so existing coverage could not be queried.

The next facet is the remaining unit tests and documentation updates. No unrelated changes were made.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate tool input and return safe rejection responses","tdd_next":"add remaining unit tests and update documentation"}}