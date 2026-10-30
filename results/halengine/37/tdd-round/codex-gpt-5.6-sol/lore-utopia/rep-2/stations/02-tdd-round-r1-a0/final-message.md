Completed and pushed commit `32c9518`.

- Closed facet: compile/cache function-valued schemas by object reference.
- Added one test; observed red, then green.
- Fixed prior typecheck, lint, and spec-link findings.
- Updated `.lore/dod.md` and traceability.
- Branch is synchronized with `origin/main` and upstream.
- Red tests: 1 ours, 0 regressions.
- Next facet: validate input and return safe rejection responses.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile and cache validators for function-valued ToolDefinitionSource schemas by schema object reference","tdd_next":"Validate input before invoking the executor and return a non-leaking ToolResponse rejection"}}