I have completed the TDD round for the requested feature.
1. I added a failing unit test in `src/orchestration/chatOrchestrator.test.ts` that verified throwing a string bypasses `onError` because it's not an `instanceof Error`.
2. I implemented the change in `src/orchestration/chatOrchestrator.ts` by coercing a caught non-Error rejection into an `Error` whose `cause` is the original value before invoking `hooks.onError`.
3. The newly added test and all 26 existing unit tests in `src/orchestration/chatOrchestrator.test.ts` pass, proving no regression on Error-instance propagation. The unit tests were run via `npm run test` using Jest.
4. I checked off the two completed facets in `.lore/dod.md`, formatted the changes using `prettier`, committed the files, and pushed to the remote branch. The branch is up-to-date with `origin/main`.

No acceptance tests from the `.lore/dod.md` file were run in this round as they are CI's to judge.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce a caught non-Error rejection to an Error","tdd_next":"Add a CHANGELOG.md entry under ## [Unreleased]"}}