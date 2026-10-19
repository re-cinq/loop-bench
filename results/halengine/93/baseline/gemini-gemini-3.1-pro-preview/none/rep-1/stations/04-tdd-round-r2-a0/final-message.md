Branch is pushed and up to date. This round fixed the two CI failures from the previous push: 25 stale spec citation line numbers (spec-names) were reanchored by running `check-spec-anchor-names --fix`, which also resolves the ESLint `require-spec-link` failures for the 7 tests that were already cited but with off-by-one line numbers.

The remaining open facet is: `Add the appropriate usage structure to unambiguously convey it as a sum in the hook signature`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI: reanchor 25 stale spec citation line numbers (spec-names + eslint require-spec-link)","tdd_next":"add type-level disambiguation so the hook signature conveys sum semantics (facet 1)"}}