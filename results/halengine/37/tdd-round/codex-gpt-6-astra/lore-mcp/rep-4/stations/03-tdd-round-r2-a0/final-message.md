Committed and pushed `61dd360`. Static validators are reused; reported import and assertion issues are repaired.

One new test went red → green and stayed green after refactoring. No regressions identified; acceptance remains CI’s verdict. Branch is current with main and upstream, with a clean working tree.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Retain static compiled validators across execution calls; repair reported CI findings","tdd_next":"Cache dynamic schema validators by object reference"}}