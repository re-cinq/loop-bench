Added enum rejection diagnostics and a focused test. The test failed before the change and passed after it. I also repaired the reported type and lint issues, added the missing changelog entry, and bumped the version to 0.4.0.

The remaining validation facet stays open. I did not run the acceptance tests, lint, or typecheck. **Red tests written this round: 1; regressions: 0 identified.** The commit was pushed, and the branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Enum rejection names the failing field and constraint","tdd_next":"Complete validation coverage for pass-through, schema caching, privacy, and tool-loop retry"}}