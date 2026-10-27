Implemented and pushed commit `2699821`.

- `beforeSession` now runs inside `try`, invoking `onError` and `afterSession`.
- Added focused regression test.
- Updated spec, changelog, and DoD.
- Test passed; CI/build checks were not run locally.
- Branch is pushed and synchronized with `origin`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"run onError and afterSession when beforeSession throws","tdd_next":"acceptance green"}}