Implemented and pushed commit `1236d62`.

- Added Ajv dependency and static schema compilation/cache.
- Added one focused regression test with spec traceability.
- Updated `.lore/dod.md`.
- Focused test passed after refactor.
- Merged `origin/main`; branch is synchronized.
- No acceptance tests, lint, typecheck, or build run.
- `npm install` reported 7 existing audit vulnerabilities; not addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"static schema compilation and validator caching","tdd_next":"input rejection behavior"}}