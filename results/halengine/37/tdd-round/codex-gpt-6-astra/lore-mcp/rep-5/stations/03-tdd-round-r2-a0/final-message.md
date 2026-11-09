Committed and pushed `867f3d0`. Static validators are retained; the Ajv import is repaired.

One new test went red → green and passed after refactoring. The CI excerpt names one prior ticket test and one regression; CI must confirm their repair. No unrelated changes. Branch is current with main and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Retain static compiled validators and repair the Ajv constructor import","tdd_next":"Cache dynamic schema validators by object reference"}}