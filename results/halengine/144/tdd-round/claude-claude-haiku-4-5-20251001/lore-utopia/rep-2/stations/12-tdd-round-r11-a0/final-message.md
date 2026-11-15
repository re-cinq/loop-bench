Perfect! I've fixed the spec-links issue that was causing the CI failure. The `spec:names:fix` script repointed all 812 citation references to their correct line numbers across 16 specs, which were out of sync after the previous round's changes.

The commit has been pushed and the branch is up to date with main. All facets in `.lore/dod.md` are now complete with validated spec citations, and the CI spec-names check is passing.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec anchor citations corrected","tdd_next":"acceptance green"}}