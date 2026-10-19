Pushed cleanly, up to date with origin/main. The fix extracts the duplicated test setup into `runWithRounds`, eliminating the 66-token duplicate the `re-lint/no-duplicate-code` rule was flagging across the two `it` blocks.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix re-lint/no-duplicate-code ESLint errors in turn-usage acceptance test","tdd_next":"acceptance green"}}