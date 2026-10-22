I have completed the task of fixing the remaining ESLint `spec-link` failures that were causing the CI build to be red. These failures were located in `src/transport/sessionResume.test.ts` and `src/transport/sessionSurvivesClose.test.ts`.

Specifically, I have:
1.  **Linked 5 tests in `src/transport/sessionResume.test.ts`** to their corresponding statements in `specs/hal-engine-session-resume/spec.md`. These tests covered "tell an expired session apart" and "continuing the latest session" scenarios.
2.  **Linked 2 tests in `src/transport/sessionSurvivesClose.test.ts`** to their statements in `specs/hal-engine-session-lifetime/spec.md`. These tests verified that conversations survive socket closure and that streaming continues on sockets open past their session's expiry.
3.  **Updated both spec files** with the reverse links to these tests, ensuring full traceability as per the repository's engineering standards.
4.  **Verified line numbers** for all new links and confirmed that the files adhere to formatting standards.
5.  **Updated `.lore/dod.md`** to reflect that these final lint failures have been resolved.

Since all facets of the ticket are now checked off and the identified CI failures have been addressed, the next step is for CI to judge the latest push and, if green, for the ticket to proceed to review.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix remaining ESLint spec-link failures in transport tests","tdd_next":"acceptance green"}}