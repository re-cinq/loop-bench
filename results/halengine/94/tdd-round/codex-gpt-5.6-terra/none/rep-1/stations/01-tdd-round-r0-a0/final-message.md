Moved `beforeSession` inside the orchestrator’s existing `try`, so its failures invoke `onError`, run `afterSession`, and still reject unchanged. Added and passed the focused regression test; acceptance tests were not run.

Committed and pushed `d14d2b8`; branch is synchronized with upstream. Red tests: 1 mine, 0 regressions. Next facet: document the guarantee in the config-hooks spec.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move `beforeSession` inside the `try` block in `chatOrchestrator.ts`.","tdd_next":"Update `specs/hal-engine-config-hooks/spec.md` with the new guarantee for `beforeSession`."}}