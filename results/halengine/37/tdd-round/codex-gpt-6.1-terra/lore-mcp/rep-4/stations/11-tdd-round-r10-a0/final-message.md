Fixed the CI lint finding in the additional-property test while retaining both checks. Committed and pushed as `648b849`; the branch is up to date with `origin/main` and its upstream.

No test was written or run in this round, so the requested red-green-refactor cycle was not completed. CI reported no red test attributable to this round and no identified regression test; its test job timed out without an actionable failure in the supplied log tail.

The remaining unit tests, spec links, and documentation updates are still open.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair additional-property test assertion lint finding","tdd_next":"Add remaining unit tests, spec links, and documentation updates"}}