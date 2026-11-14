Delivered commit `a1779f9` on `loop-bench/95` (synced with `origin/main` and pushed):
- Coerced non-`Error` rejections to an `Error` with `cause` via `coerceToError` in `src/orchestration/chatOrchestrator.ts` while passing `Error` instances through unchanged and rethrowing the original rejection.
- Verified `src/orchestration/chatOrchestrator.test.ts` passes (27/27 green; 0 red tests of ours, 0 regressions), updated `specs/hal-engine-config-hooks/spec.md`, `CHANGELOG.md`, and `.lore/dod.md`.
- Unrelated observations (left untouched): `saveSession` in `src/orchestration/chatOrchestrator.ts` formats non-`Error` throwables with `String(error)` rather than `inspect(error)`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections for onError with unit test, spec citation, and CHANGELOG entry","tdd_next":"acceptance green"}}