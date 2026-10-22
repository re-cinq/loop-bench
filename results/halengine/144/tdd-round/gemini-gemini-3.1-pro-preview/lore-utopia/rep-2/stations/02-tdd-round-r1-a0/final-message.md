I have resolved all CI failures reported from the previous round (eslint, tests, spec-names, changelog). I refactored the duplicated code out into `wsTestSupport.ts`, fixed the linter errors in `validation.test.ts` and `validation.ts`, repointed the spec links to the shifted line numbers, and appended the required changelog entry.

The round did not run acceptance tests, as they are CI's to run. No tests were executed here other than the individual ones for the CI fixes, which are now green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fixed CI failures for list_sessions validation and tests","tdd_next":"Thread sessionStore into createMessageHandler"}}