Fixed both CI failures in `specs/hal-engine-config-hooks/spec.md`:
1. **eslint** (`re-lint/require-spec-link` at L45): The spec now correctly points to L45 for "returns undefined when both are undefined", giving that test its required spec link.
2. **spec-names** (mismatched name): Updated from the non-existent "returns the defined value when one side is undefined" to the two real test names ("returns the left value when the right side is undefined" at L35 and "returns the right value when the left side is undefined" at L40). Both tests are now properly cited.

No test was written this round (pure spec metadata fix). All facets in `.lore/dod.md` remain ticked; this was only closing the CI red from the previous push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix spec link names and line numbers (eslint + spec-names CI failures)","tdd_next":"acceptance green"}}