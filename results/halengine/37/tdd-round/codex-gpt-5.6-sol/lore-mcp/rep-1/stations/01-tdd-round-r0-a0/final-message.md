Completed and pushed commit `8f18b72` (`feat(tools): compile static input schemas`).

- Added Ajv runtime dependency and bumped version to `0.4.0`.
- Static schemas now compile during registration and identify invalid tools.
- Added one focused unit test with spec traceability.
- Test passed: `registry.test.ts` — 1 test.
- Red tests: 1 ours, 0 regressions.
- Next facet: cache function-valued schemas by object reference.
- Unrelated observation: npm reports 14 existing dependency vulnerabilities; unchanged.
- Branch is synchronized with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ajv runtime dependency, bump the minor version, and compile static schemas at registration","tdd_next":"Cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference"}}