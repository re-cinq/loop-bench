Branch is up to date. This round fixed all three CI-reported failures:

1. **spec-names**: Repointed 6 drifted citations via `spec:names --fix`
2. **eslint require-spec-link**: Added `§4.3 list_sessions` to `specs/hal-engine-websocket-protocol/spec.md` with `([validated by: ...])` citations for all 10 tests in `validation.test.ts` (lines 6–71)
3. **changelog**: Added a `list_sessions` / `session_list` entry under `## [Unreleased]`

Additionally completed two previously unchecked dod.md facets: re-exported `ListSessionsMessage`, `SessionSummaryFrame`, `SessionListMessage` from `src/index.ts`, and documented `list_sessions`/`session_list` in the websocket-protocol spec. All six facets are now ticked; the three acceptance tests in dod.md remain for CI to judge.

Unrelated smells noticed but not acted on: the conversation-list spec's "Over the WebSocket protocol" section could be expanded with more detailed references to the new spec sections — left for a later editorial pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"document list_sessions/session_list in protocol spec + fix spec-links + changelog + re-export types","tdd_next":"acceptance green"}}