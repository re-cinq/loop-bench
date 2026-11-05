I fixed the one CI finding from the last push, and the branch is pushed with nothing ahead of upstream. I didn't re-run `spec:names` or any tests in this pod; CI judges the push.

The `spec-names` check failed because the `beforeSession` line in `specs/hal-engine-config-hooks/spec.md` (line 26) linked to `#L40`, while its test sits at `#L32`. I repointed it to `#L32`. Prettier passes on the file. `origin/main` was already merged, so the merge added nothing.

No new test this round, so no red tests of mine and no regressions. All three facets in `.lore/dod.md` were already ticked.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repoint spec anchor for beforeSession test to #L32 (spec-names CI finding)","tdd_next":"acceptance green"}}