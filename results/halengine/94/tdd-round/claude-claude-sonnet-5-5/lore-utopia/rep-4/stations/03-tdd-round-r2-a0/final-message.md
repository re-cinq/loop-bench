I fixed the one finding in the CI verdict, the `spec-names` check. The spec cited the `beforeSession` acceptance test at `#L40`, but the test is at `#L32`. I repointed the link in `specs/hal-engine-config-hooks/spec.md` (line 26) and confirmed prettier is clean on that file.

This round ran no tests here. The change is a one-line edit to a spec link, so I left verification to CI.

I committed and pushed the fix. `origin/main` had nothing to merge, and the branch is level with its upstream.

No tests were red from my own work this round, and there were no regressions. The ticket's code, spec and CHANGELOG facets were already ticked in `.lore/dod.md`, so I changed nothing there.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repoint spec anchor to test line (spec-names CI finding)","tdd_next":"acceptance green"}}