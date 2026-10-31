Repaired CI’s duplicate-code lint findings by consolidating scripted-provider and tool-registry setup in the usage test. Formatted, committed, pushed, and confirmed branch is current with `origin/main`.

No tests ran locally: this was a CI lint repair and the round permits only a newly written test, while acceptance tests remain CI-only. Red tests: 0 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Deduplicate scripted provider setup in usage coverage","tdd_next":"acceptance green"}}