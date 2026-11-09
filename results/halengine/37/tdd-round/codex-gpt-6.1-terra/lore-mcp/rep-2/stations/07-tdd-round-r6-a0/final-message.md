Committed and pushed `c8c6eca`. The registry now imports Ajv through its package entry point and names explicitly forbidden extra properties in rejection paths.

The new focused test failed before the fix and passed afterward. Node also resolved the Ajv package entry point locally. CI will verify the clean install, typecheck, and full suite; the branch is up to date with `origin/main` and its upstream.

This round had **1 red test of mine and 0 locally observed regressions**. The previous CI report included at least one pre-existing suite that failed to load, but its output was truncated, so the full regression count is unknown. No unrelated smells were identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair the Ajv package import and report explicitly forbidden extra-property paths","tdd_next":"Add remaining unit tests and update documentation"}}