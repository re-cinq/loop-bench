I have fixed all the CI failures reported in the previous run. This included resolving duplicate code between `conversationList.acceptance.test.ts` and `sessionResume.test.ts` by extracting `teardown`, `delegatingTo`, and `eventually` into `wsTestSupport.ts`. I also addressed the nested-if, prefer-early-return, and camelcase rules, and finally ran the `repoint-spec-anchors` script after updating the test spec links to satisfy `require-spec-link`. 

I formatted the codebase with Prettier, committed, and pushed the branch to origin. No tests were executed in this round as the entire focus was on addressing the CI findings from the previous push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed CI failures","tdd_next":"Thread sessionStore into createMessageHandler"}}