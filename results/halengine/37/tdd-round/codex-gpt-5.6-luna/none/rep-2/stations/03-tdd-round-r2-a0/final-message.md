Implemented one red–green–refactor round for static schema compilation errors.

- Invalid schemas now throw registration errors naming the tool.
- Added traceable unit test and updated `.lore/dod.md`/spec.
- Focused test: 3 passed; 1 intentional red failure, 0 regressions.
- Formatted, committed, pushed, and merged `origin/main`.
- Commit: `a18379d`

Next facet: cache function-valued schema validators by schema reference.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"static schema compilation errors name the tool","tdd_next":"cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference"}}