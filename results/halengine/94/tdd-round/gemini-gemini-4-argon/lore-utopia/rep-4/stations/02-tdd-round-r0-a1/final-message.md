All facets in `.lore/dod.md` are already closed by commit `516ef12` and pushed to `origin/loop-bench/94` (which is up to date with `origin/main`):
- `beforeSession` is inside the `try` block in `src/orchestration/chatOrchestrator.ts`, so errors thrown from it invoke `onError` and `afterSession` before propagating to the caller.
- `specs/hal-engine-config-hooks/spec.md` and `specs/hal-engine-architecture/spec.md` are updated and all spec anchor, link, and doc checks pass.
- `CHANGELOG.md` documents the fix and migration note under `[Unreleased]`.
- No `round-brief.md` or CI failures exist, and no tests were run in this pod (0 red tests of ours, 0 regressions).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}