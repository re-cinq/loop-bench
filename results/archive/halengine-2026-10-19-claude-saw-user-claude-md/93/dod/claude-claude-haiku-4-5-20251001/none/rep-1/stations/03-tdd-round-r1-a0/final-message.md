Branch is pushed and up to date. This round fixed three CI failures:

1. **Test failures** — `multiRoundProviderWithUsage` was yielding an extra `{type: 'stop', stopReason: 'end_turn'}` chunk after the `tool_use` stop, which overwrote `stopReason` and caused `shouldContinueToolLoop` to return false, so tools were never called and rounds never accumulated. Fixed by embedding usage directly in the last stop chunk of each round.

2. **ESLint `no-duplicate-code`** — extracted `captureUsage()` and `textProvider()` helpers to remove the repeated hooks setup and inline provider patterns.

3. **ESLint `require-spec-link`** — added four `([validated by: ...])` inline citations to `specs/hal-engine-config-hooks/spec.md`, one per acceptance test.

Unrelated smells noticed (not touched): the `specs/hal-engine-config-hooks/spec.md` "Measured semantics — out of scope" section description still says "This issue changes none of them" — but the second bullet now describes the changed behavior, so that prose is stale. A future round could clean this up.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update specs/hal-engine-config-hooks/spec.md with spec links; fix broken multiRoundProviderWithUsage helper; eliminate duplicate code","tdd_next":"Add CHANGELOG entry explaining the behaviour change for existing consumers"}}