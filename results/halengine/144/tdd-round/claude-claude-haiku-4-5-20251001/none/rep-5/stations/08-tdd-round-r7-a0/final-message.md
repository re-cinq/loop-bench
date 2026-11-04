Perfect. I've successfully fixed the CI failure. The spec citation was pointing to a non-declaration line (522) in the test file. I corrected it to point to the actual test declaration at line 517 with the proper description. The fix has been committed and pushed, and the branch is up to date with main.

All facets in the `.lore/dod.md` were already marked complete from previous rounds. This round involved only the CI fix for the spec-names check, which is now resolved.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}