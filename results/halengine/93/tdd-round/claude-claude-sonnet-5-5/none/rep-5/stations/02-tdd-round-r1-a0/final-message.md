This round fixed the four eslint findings from CI's red build and pushed the fix. I ran no tests, lint or typecheck here, so CI's verdict on the push is the check.

- **Missing spec links:** `specs/hal-engine-config-hooks/spec.md` now has statements linked to the second acceptance test and to the three `addUsage` helper tests.
- **Too many expects:** I split the three-assertion `addUsage` test in `orchestratorHelpers.test.ts` into two tests with one assertion each, so the `max-expects` rule is met.
- **Checklist:** I ticked the last two facets in `.lore/dod.md`.

The merge with `origin/main` was already up to date, and `git status` shows the branch is not ahead of its upstream.

All four red findings were mine to fix. None were regressions in tests I didn't write.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint findings: spec links for usage tests, one expect per addUsage test","tdd_next":"acceptance green"}}