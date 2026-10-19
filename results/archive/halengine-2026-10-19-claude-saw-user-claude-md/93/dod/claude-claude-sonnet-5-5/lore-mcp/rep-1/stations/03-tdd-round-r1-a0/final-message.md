Now update the DoD to tick the facet. All three facets were already ticked, and this was purely fixing CI failures (spec link re-anchoring). The DoD is already complete.

**What happened:** The CI was failing because inserting the `accumulateUsage` describe block shifted `orchestratorHelpers.test.ts` line numbers by +11 (tests moved from L11/15/19/23 to L22/26/30/34), breaking the `spec-names` check. Additionally, the second acceptance test at line 77 had no spec link entry anywhere, failing `eslint re-lint/require-spec-link`. Fixed both: updated line numbers in `specs/hal-engine-architecture/spec.md` and added the missing statement+link in `specs/hal-engine-config-hooks/spec.md`.

0 regressions caused by this round; 0 tests written (mechanical spec fix). No unrelated smells noticed beyond what was already in the DoD.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix spec link line numbers and add missing spec link for acceptance test line 77","tdd_next":"acceptance green"}}