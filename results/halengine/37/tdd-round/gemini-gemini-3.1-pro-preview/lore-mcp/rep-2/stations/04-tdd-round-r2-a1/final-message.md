I have fixed the CI build failures from the previous round (typecheck on `ajv` constructor, eslint warnings, prettier formatting, and spec-names) which now means the code for validating `input` in `ToolRegistry.execute` without leaking offending values passes CI correctly.

I also added the required unit tests to `src/orchestration/tools/registry.test.ts` to cover the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, linked those statements, and updated the spec's status to `Shipped`.

There were 0 red tests of my own and 0 regressions, as the previous round's logic was functionally correct and the acceptance tests were passing on the last push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input in ToolRegistry.execute before invoking the executor, returning a ToolResponse ({result}) that names failing field paths and expected types/required fields without echoing or logging offending values","tdd_next":"Add unit tests in src/orchestration/chatOrchestrator.test.ts and update example/weather-tool.ts, docs/adding-a-tool.md, README.md, .specify/spec.md, adrs/ADR-002-response-validation.md, and CHANGELOG.md"}}