This round closed the `limit` validation facet and pushed it, but the build will still be red. I did not fix the lint findings on the acceptance test or on `sessionResume.test.ts`.

**TDD round (limit validation)**
- Red: added a test in `src/transport/ws/validation.test.ts` that `list_sessions` with `limit` of 0, 201, 1.5, `'10'` or -1 is invalid and names the field. It failed because the validator accepted every `list_sessions` frame.
- Green: `validateListSessionsMessage` in `src/transport/ws/validation.ts` accepts an absent limit and an integer 1–200, and rejects anything else with `INVALID_MESSAGE`. `ListSessionsMessage` in `src/types/messages.ts` gained an optional `limit`.
- Refactor: nothing further needed.
- The test file ran green locally (5/5 in `validation.test.ts`). Jest was run on that one file only; the acceptance tests were not run.
- Open conflict: `.lore/dod.md` says the limit is a non-negative integer, but the ticket says 1–200 with `limit: 0` invalid. I built to the ticket and noted the conflict in `dod.md`. Someone needs to pick one.

**CI findings from the previous push**
- `spec-names`: fixed with `npm run spec:names -- --fix`, which repointed three citations in `specs/hal-engine-conversation-list/spec.md`. The recheck reports 794 citations naming their tests, with no findings.
- `changelog`: added a bullet under `## [Unreleased]` in `CHANGELOG.md` describing the `list_sessions` frame. It says the `session_list` answer is still being built.
- `eslint` on `src/transport/conversationList.acceptance.test.ts`: not fixed. The findings are duplicated code against `sessionResume.test.ts`, a prefer-early-return, and a missing spec link at L163. Fixing them means editing the acceptance test, which the rules forbid, and removing the duplicate means editing an existing test file. The spec-names repoint may clear the L163 link finding, but I have not verified that.
- `eslint` on `src/transport/sessionResume.test.ts`: not fixed, for the same duplication reason.
- `test`: the acceptance tests are still red, as expected mid-ticket. I could not read the full CI failure list (the brief was truncated and `lore_get_ci_failures` returned 404 for the branch), so I cannot say whether any red test is a regression I caused.

**Other notes**
- Naming mismatch: the ticket says `list_conversations` and `conversation_list`, while the acceptance tests and dod use `list_sessions` and `session_list`. I followed the tests.
- Counts: red tests that were mine, zero that I can confirm. Regressions, unknown until the full CI list is read.
- Commit `feat(transport): validate list_sessions limit` is pushed to `loop-bench/144`. The branch was already up to date with `origin/main`, so no merge was needed. `git status` reports it is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"limit validation: integer 1-200 else INVALID_MESSAGE","tdd_next":"before validation: object with 1-128 char sessionId and parseable updatedAt, else INVALID_MESSAGE"}}