Push confirmed. The branch is up to date with no outstanding changes.

**Summary of fixes in this round:**

- `specs/hal-engine-config-hooks/spec.md`: Added `validated by` links for tests at L311 (`non-Error rejection still reaches the caller`), L415 (`works without any hooks configured`), and L574 (`keeps the usage an earlier round reported when a later round reports none`).
- `specs/hal-engine-tool-budget/spec.md`: Added `validated by` link for test at L496 (`stops asking for tools once maxToolRounds is spent`).
- `specs/hal-engine-tool-responses/spec.md`: Added `validated by` link for test at L523 (`appends an upserted entry to the session and rewrites its index to match`).
- `specs/hal-engine-tool-input-validation/spec.md`: Fixed stale line reference L567→L597 for `resolves processMessage and makes the validation-rejection text visible to the provider on the next round` (the spec-names check failure).

No tests were written — the CI failures were documentation/traceability issues (missing and stale spec links), not behavior gaps. 0 regressions introduced; 0 tests written by this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Keep the repository's build, test, typecheck, ESLint, and Prettier gates green","tdd_next":"acceptance green"}}