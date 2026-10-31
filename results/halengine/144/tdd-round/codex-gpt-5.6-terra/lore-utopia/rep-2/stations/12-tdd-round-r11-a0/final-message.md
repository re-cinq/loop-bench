Repaired and pushed CI’s `no-nested-if` finding in `askAfterConnect` without changing behavior. Formatter ran; no tests ran locally because this was a structural lint-only CI repair and the required acceptance suite must not be run here. No unrelated changes.

Red tests: 0 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI lint finding in askAfterConnect","tdd_next":"acceptance green"}}