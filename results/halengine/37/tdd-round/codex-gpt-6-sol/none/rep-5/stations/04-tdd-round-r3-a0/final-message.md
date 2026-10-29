Committed and pushed one round (`96db8ec`); the branch is even with its upstream. The new enum rejection test failed, then passed after the change. I also addressed the prior CI lint findings and normalized required-field messages. CI will judge the acceptance tests; I did not run them here.

Red tests written this round: 1. Regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Name the enum constraint in a rejection without echoing the rejected value, and normalize required-field messages","tdd_next":"Add remaining unit tests and update tool documentation"}}