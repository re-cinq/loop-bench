Committed and pushed `72cfa27`. Dynamic validators now cache by schema identity. Fixed the reported assertion-count finding.

One new test went red → green and stayed green after refactoring. Red tests: 1 ours, 0 reported regressions. Branch is current with main and fully pushed. Acceptance remains CI’s responsibility.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cache dynamic schema validators by object reference","tdd_next":"Pin wrong-type rejection diagnostics and value privacy with a unit test"}}