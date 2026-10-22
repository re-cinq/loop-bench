I have completed the round. 
I fixed the CI failures related to TypeScript, Eslint `max-expects`, and Eslint missing spec links for the `messageHandler.test.ts` file. During this process, I formatted the codebase using Prettier, which shifted some line numbers in `messageHandler.test.ts`. As a result, several existing tests triggered `require-spec-link` errors in Eslint because their line numbers no longer matched the documentation. I manually updated these line references across the corresponding `specs/**/*.md` files.

I also documented `list_sessions` and `session_list` under the WebSocket Protocol specifications, completing the final facet of the ticket. After resolving the issues, all tests, linters, type checks, and document checks pass locally (as verified via `npm run verify`). The branch has been merged with `origin/main` to prevent drift and pushed successfully.

No tests were run locally using `vitest` since this repository uses `jest`, but I verified the entire suite with `npm run verify` which confirmed all 709 tests passed.

0 red tests were regressions; all failures addressed were specific to my own modifications in this branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in specs","tdd_next":"acceptance green"}}