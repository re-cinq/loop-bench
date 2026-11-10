This round addressed the facet: **Update `specs/hal-engine-config-hooks/spec.md` with the new guarantee for `beforeSession`**.

### Summary of Changes
- Replaced the recorded-flaw entry under `## Measured semantics — out of scope` in `specs/hal-engine-config-hooks/spec.md` with the new guarantee under `## Installing hooks through config`, documenting that when `beforeSession` throws, the turn is aborted before provider interaction, `onError` and `afterSession` are triggered, and `afterSession` can assume no tools were run.
- Updated the count of out-of-scope properties from three to two.
- Validated spec citations and anchor names via repository scripts (`check-spec-anchor-names.mjs`, `check-spec-links.mjs`, and `check-spec-status.mjs`).
- Formatted modified files with Prettier.
- Updated `.lore/dod.md` to tick the completed facet.
- Committed, merged latest `origin/main`, and pushed to `origin/loop-bench/94`.

The round ran no tests in this pod as it delivered the spec documentation facet for the behavior previously implemented and pinned. No regressions were caused. No unrelated smells were observed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession.","tdd_next":"Document in the CHANGELOG what changes for an existing consumer."}}