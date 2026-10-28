Committed and pushed `8c08892`. Dynamic schemas now cache validators by object identity; both CI findings were repaired.

One new test went red, then green. No regression test failures were reported. Acceptance tests remain for CI. Branch is current with main and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cache dynamic schema validators by object reference and repair CI findings","tdd_next":"Complete safe rejection diagnostics and remaining validation behaviour tests"}}