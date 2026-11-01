Committed and pushed `ec058ee`: repaired Ajv constructor typing and normalized legacy enum rejection messages.

One new test went red → green; refactor review retained the minimal design. CI reported one ticket-owned failing test, zero identified regressions, plus the type error. Acceptance verification remains with CI.

Branch is clean, synchronized, and current with main. Next: dynamic-schema caching. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI Ajv constructor typing and legacy enum rejection messages","tdd_next":"Cache dynamic schema validators by object reference"}}