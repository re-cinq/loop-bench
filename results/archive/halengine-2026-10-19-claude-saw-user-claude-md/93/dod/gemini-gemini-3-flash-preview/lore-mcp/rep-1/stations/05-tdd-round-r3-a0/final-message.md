Also need to tick the `.lore/dod.md` — all facets were already ticked. The CI failure was from the eslint spec-link rule, which I've now fixed. Let me verify the dod is current.

The `.lore/dod.md` already has all facets ticked. This round fixed the 3 ESLint spec-link errors (CI's only reported failures) by adding spec statements in `specs/hal-engine-config-hooks/spec.md` that cite the missing test lines.

0 regressions — the failing tests were CI's spec-link linter, not test assertions. The fix adds spec citations in the spec file, which is the correct place per the linter's guidance.

No smells noticed beyond scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint spec-link errors for accumulateUsage edge-case tests","tdd_next":"acceptance green"}}