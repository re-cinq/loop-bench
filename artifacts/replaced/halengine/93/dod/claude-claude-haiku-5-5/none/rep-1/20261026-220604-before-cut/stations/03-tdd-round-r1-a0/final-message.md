The DoD still shows facet 3 as open, which is correct — the CI failures I fixed were not new facets but regressions from lint violations. The DoD is accurate as-is. Let me verify by quickly summarizing what's open:

From the DoD:
- [x] Choose shape - done
- [x] Accumulate usage across every provider call - done  
- [ ] Make hook's type say the value is a turn sum - still open (facet 3)
- [x] Rewrite under-counting bullet in spec - done
- [x] CHANGELOG entry - done

The CI failures I fixed this round were lint errors introduced by the previous round's test code (no-duplicate-code, max-expects, require-spec-link). All 7 ESLint errors have been addressed.

0 regressions — all failures were in newly-written test files from the prior round.

Unrelated smells noticed but not acted on: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all 7 eslint failures from prior round (no-duplicate-code, max-expects, require-spec-link)","tdd_next":"add named type or doc comment on afterModelResponse making turn-sum semantics explicit (facet 3)"}}