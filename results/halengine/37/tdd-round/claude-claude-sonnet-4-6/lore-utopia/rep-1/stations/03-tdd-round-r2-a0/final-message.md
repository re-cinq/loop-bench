Branch is up to date. The push landed successfully. This round:

- Added test `execute returns a ToolResponse naming the missing required property when a required field is omitted` to `registry.test.ts` — this was the name that `spec.md` cited but which no longer existed after the previous round replaced it
- Added test `execute throws an error when called with an unregistered tool name` — covers the `!tool` branch in `execute()`, filling a coverage gap
- Added `([validated by: ...])` citations in `spec.md` for the two previously uncited statements (extra-property pass-through and unknown-tool throw)
- Ran `spec:names --fix` to repoint all `#Lnn` anchors to current line numbers
- All 3 registry unit tests pass locally; spec-names check passes

Remaining in the last facet: compile-once and dynamic-schema unit tests, remaining doc updates (`example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix spec-names CI failure: add missing named test and spec citations","tdd_next":"add compile-once and dynamic-schema unit tests, then doc updates"}}