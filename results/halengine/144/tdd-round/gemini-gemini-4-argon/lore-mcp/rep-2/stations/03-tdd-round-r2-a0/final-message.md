Resolved the two CI failures reported in `round-brief.md`:
- Replaced the object literal with unquoted snake_case property keys (`user_message`, `list_sessions`) in `src/transport/ws/validation.ts` with a `Map<string, (message: Record<string, unknown>) => ValidationResult>` so `eslint` `camelcase` passes while preserving `re-lint/prefer-polymorphism`.
- Repointed the two `#L873` citations in `specs/hal-engine-conversation-list/spec.md` to `#L872` to match the test declaration in `src/transport/ws/messageHandler.test.ts`.
- Red tests: 0 of mine, 0 test regressions (2 CI check failures: `eslint` and `spec-names`, both fixed).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Resolve CI camelcase lint failure in validation.ts and spec-names anchor line in specs/hal-engine-conversation-list/spec.md","tdd_next":"acceptance green"}}