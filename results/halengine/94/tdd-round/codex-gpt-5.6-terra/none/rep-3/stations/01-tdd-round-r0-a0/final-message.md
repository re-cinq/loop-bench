Moved `beforeSession` inside the protected block and added a focused regression test. The new test passed; its standalone Jest run printed expected coverage-threshold warnings, but the selected assertion passed.

Committed and pushed `b302725`; branch is merged with `origin/main` and not ahead. Red tests: 1 authored red test, 0 regressions. Remaining facets: spec guarantee and changelog entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move `beforeSession` inside the `try` block in `chatOrchestrator.ts`.","tdd_next":"Update `specs/hal-engine-config-hooks/spec.md` with the new guarantee for `beforeSession`."}}