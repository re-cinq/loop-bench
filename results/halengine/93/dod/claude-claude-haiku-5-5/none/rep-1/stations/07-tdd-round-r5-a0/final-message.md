The branch is pushed and up to date. The 3 eslint (`require-spec-link`) errors and the `spec-names` CI failure are fixed — `spec:names --fix` reanchored 10 stale line citations across `specs/hal-engine-architecture/spec.md`, `specs/hal-engine-config-hooks/spec.md`, and `specs/hal-engine-tool-input-validation/spec.md`, all pointing to line numbers that shifted when the `makeUsageOrchestrator` helper was extracted last round.

The MongoDB timeout in `mongoRedaction.test.ts` is infrastructure flakiness (MongoDB failing to start within 120 s) in code entirely unrelated to this ticket; no code change can fix it, and it was present before any of this ticket's changes.

Unrelated smells noted but not touched: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"reanchor stale spec-link citations (eslint require-spec-link + spec-names CI failures)","tdd_next":"acceptance green"}}