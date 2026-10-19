Branch is up to date and pushed. Fixed the ESLint `re-lint/max-expects` violation at line 593 by replacing two `expect` calls with a single `toEqual` assertion that checks both the rejection value and `onErrorCalled` flag together.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix ESLint max-expects violation in non-Error gate test","tdd_next":"acceptance green"}}