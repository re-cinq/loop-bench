Completed and pushed commit `66deae4`.

- Added a focused test for invalid static schemas naming the tool.
- Wrapped AJV compilation errors with the tool name.
- Fixed AJV imports to use the public package entrypoint.
- Updated spec links and the DOD checklist.
- Focused test passed; 1 red test was mine, 0 regressions.
- Branch is synced with `origin/main` and upstream.
- Next facet: cache function-valued schemas by object reference.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static schemas at registration time with named errors","tdd_next":"Cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference"}}