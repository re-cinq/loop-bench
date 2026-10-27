Implemented and pushed commit `0736b78`.

- Added schema-validator caching via `WeakMap`.
- Fixed Ajv typing and top-level redacted error paths.
- Updated DOD/spec traceability.
- Test file passed after the intentional red phase.
- Acceptance, lint, typecheck, and build were not run.

1 authored red test; 1 CI test regression repaired.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"cache compiled validators by schema object reference","tdd_next":"valid passthrough and remaining acceptance facets"}}