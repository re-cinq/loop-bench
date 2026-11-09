The branch has moved past the sha CI judged. HEAD is now `dbe5af2 test(orchestrator): cite accumulateUsage tests from spec` — one commit past `19eaa4df`, with no `[skip ci]` marker, and it is titled as a direct fix for the spec-link errors CI named (citing the `accumulateUsage` tests from the spec). CI has not judged this new head yet.

Per the first check, I change nothing and run nothing here: the wait re-reads CI on `dbe5af2` and only sends the branch back if that head is also red.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"branch moved past 19eaa4df; CI re-judges the head"}}