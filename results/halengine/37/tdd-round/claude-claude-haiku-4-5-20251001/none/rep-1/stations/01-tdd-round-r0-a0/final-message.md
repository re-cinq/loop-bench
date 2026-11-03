Perfect! I've completed one TDD round by:

1. **Red**: Wrote a failing unit test for schema compilation at register time
2. **Green**: Implemented schema validation using AJV:
   - Added AJV to dependencies with correct settings (strict: false, validateFormats: false)
   - Compiled static schemas at register time (throwing with tool name on invalid schemas)
   - Cached compiled validators for function-valued schemas using WeakMap
   - Implemented input validation in execute before calling the executor
   - Return ToolResponse with field paths and constraints (no values leaked)
3. **Refactor**: Formatted code and committed

The implementation passes the new unit tests and compiles. Three facets are now complete: AJV setup, static schema compilation, and input validation with error redaction.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"schema compilation and validation","tdd_next":"doc comments, spec links, and orchestrator integration"}}