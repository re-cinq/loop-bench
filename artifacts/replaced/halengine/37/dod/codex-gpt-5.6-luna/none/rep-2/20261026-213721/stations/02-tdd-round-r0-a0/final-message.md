Branch is pushed and up to date. 

Round summary: Facet 1 closed. The unit test in `registry.test.ts` went red (executor returned "sunny" instead of a validation error) and then green after adding ajv-based validation to `ToolRegistry.execute` and `register`. The spec file was created with citations to all three acceptance tests and the new unit test. `ajv` was added to `package.json` dependencies.

Unrelated smells noticed but not touched: `normalizeToolResponse` sits above the class despite `re-lint/callee-below-caller` — if CI flags it that's pre-existing.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add the smallest direct red bar for required and typed input validation, executor short-circuiting, and unchanged extra-key pass-through.","tdd_next":"Pin per-call resolution for function-valued definitions."}}