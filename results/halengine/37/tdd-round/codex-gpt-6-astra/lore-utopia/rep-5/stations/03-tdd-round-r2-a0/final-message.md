Committed and pushed `fc36437`. Static validators are reused; the Ajv typing finding is addressed.

One new test went red → green and passed after refactoring. Reported regressions: 0. Acceptance tests remain for CI. Branch is clean and synchronized with upstream. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reuse static registered validators and repair the Ajv typing finding","tdd_next":"Cache dynamic schemas by object reference"}}