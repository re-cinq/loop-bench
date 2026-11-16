Branch is clean and pushed. This round:

- **Red**: added unit test `runs onError and afterSession when beforeSession throws` in `chatOrchestrator.test.ts:116` — confirmed failing
- **Green**: moved `beforeSession` inside the `try` block in `chatOrchestrator.ts:92` — all 24 tests pass
- **Refactor**: none needed; updated all spec links shifted by the new test, promoted the `beforeSession` guarantee in `specs/hal-engine-config-hooks/spec.md` from "out of scope" to a delivered guarantee, added CHANGELOG entry

Unrelated smells noticed but not touched:
- The `catch` gates `onError` on `error instanceof Error` (out of scope, HALEngine#94 explicitly excludes it)

Red tests this round: 1 (mine). Regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block","tdd_next":"acceptance green"}}