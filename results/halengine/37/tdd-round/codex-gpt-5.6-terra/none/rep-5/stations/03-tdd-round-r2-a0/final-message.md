Closed the validation-path facet and pushed `1fca15a`.

- Added a red/green unit test for nested required-property paths.
- Validation now reports `/location/postalCode is required.`
- Addressed reported typing, spec-link, and acceptance-test lint issues.
- Ran only `src/orchestration/tools/registry.test.ts`: passed.
- Red tests: 1 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input in ToolRegistry.execute before invoking the executor, returning a ToolResponse (`{result}`) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.","tdd_next":"Add unit tests in src/orchestration/tools/registry.test.ts and src/orchestration/chatOrchestrator.test.ts, link the remaining statements in specs/hal-engine-tool-input-validation/spec.md, and update example/weather-tool.ts, docs/adding-a-tool.md, README.md, .specify/spec.md, adrs/ADR-002-response-validation.md, and CHANGELOG.md."}}