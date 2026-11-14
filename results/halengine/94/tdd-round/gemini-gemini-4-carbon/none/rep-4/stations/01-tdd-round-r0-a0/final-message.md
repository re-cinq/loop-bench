Completed one red-green-refactor round (`e267fcc` pushed to `origin/loop-bench/94`):

- **Tests**: 1 red test was mine in the RED phase (`aborts before later hooks and provider calls while running onError then afterSession` in `src/orchestration/chatOrchestrator.test.ts`, now green with all 24 tests in that file passing); 0 regressions.
- **Implementation & Docs**: Moved `hooks?.beforeSession` inside `try` in `src/orchestration/chatOrchestrator.ts`, updated `specs/hal-engine-config-hooks/spec.md` with the normative guarantee and `afterSession` partial-allocation semantics, added the consumer migration note to `CHANGELOG.md`, and ticked the completed facets in `.lore/dod.md`.
- **Unrelated items noticed and left untouched**: `onError` remains gated on `error instanceof Error`, and `afterModelResponse` still receives only `lastUsage` rather than summing usage across tool rounds (both explicitly out of scope).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts, update specs/hal-engine-config-hooks/spec.md, and document in CHANGELOG.md","tdd_next":"acceptance green"}}