Fixed all four reported lint findings: linked the usage helper tests to the spec and combined the two assertions in the flagged test. Committed and pushed as `2d8b356`; the branch is up to date with `origin/main` and its upstream.

Prettier and `git diff --check` passed. I did not run lint or build locally, as instructed; CI has not yet judged this push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed missing spec links and the two-assertion usage helper test"}}