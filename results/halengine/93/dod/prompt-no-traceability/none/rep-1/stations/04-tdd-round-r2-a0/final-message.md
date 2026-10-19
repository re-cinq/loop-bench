Branch is up to date. The round fixed all CI failures from the brief:

1. **spec-names (25 findings)**: `spec:names --fix` reanchored all stale `#Lnn` pointers in `specs/hal-engine-architecture/spec.md`, `specs/hal-engine-config-hooks/spec.md`, and `specs/hal-engine-tool-input-validation/spec.md` — these were shifted when tests were inserted in the prior round.

2. **eslint/require-spec-link (6 findings)**:
   - The 4 `chatOrchestrator.test.ts` errors (L387, L415, L450, L480) were already cited in `specs/hal-engine-architecture/spec.md`; the reanchor fixed the line numbers so ESLint can now find them.
   - The 2 `orchestratorHelpers.test.ts` errors (L29, L40) had no spec statement at all — added two new statements to `specs/hal-engine-config-hooks/spec.md` under Usage reporting describing the sum computation and the single-round passthrough.

0 regressions written. 0 new tests written (this was a CI-fix round, not a red-green round).

No unrelated smells acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures (spec-names + eslint require-spec-link)","tdd_next":"acceptance green"}}