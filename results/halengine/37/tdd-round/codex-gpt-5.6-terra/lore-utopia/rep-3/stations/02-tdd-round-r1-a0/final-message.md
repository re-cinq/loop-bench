Implemented and pushed `84e66e8`.

- Added wrong-type rejection/redaction coverage; it passed after implementation.
- Cached compiled validators and report safe field/type errors.
- Addressed reported traceability, lint-shape, and changelog issues.
- Local test run: `registry.test.ts` passed. One red test was mine; regressions: 0.
- Next facet: registration-time schema compilation and dynamic-schema cache tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"reject wrong-typed properties without leaking values","tdd_next":"compile static schemas and cover dynamic-schema validator caching"}}