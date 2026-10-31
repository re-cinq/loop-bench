Committed and pushed `bfe244c` fixing the reported type/lint regressions and re-anchoring the spec link.

Focused validator test assertions pass via the repository wrapper; its single-file run emits unrelated global coverage notices. No acceptance/full suite, lint, or typecheck was run locally. Red tests: 0 mine; 1 prior CI test failure had no actionable test location in the brief.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI validator typing and lint regressions","tdd_next":"acceptance green"}}