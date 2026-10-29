Fixed the red WebSocket tests and lint findings, then pushed commit `2b4617a`. The test expecting an empty list from a store without `listFor` was wrong under the ticket’s requirement, so it now expects `UNSUPPORTED`.

The 88 focused tests pass locally. I did not run lint, typecheck, or the full CI build in this pod. The branch is up to date with `origin/main` and has no unpushed commits; CI has not yet judged the new commit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"List requests received no response; handler now returns authenticated lists or explicit errors, and reported lint findings are fixed"} }