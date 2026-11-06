This round fixed all four findings from CI's red build on 836d13e and is pushed. `origin/main` merged in with nothing new ("Already up to date"), and the branch is not ahead of its upstream. CI on this push decides whether it's green; I didn't run lint or the changelog check here.

**What changed:**
- **Lint, `chatOrchestrator.ts`:** I moved `describeRejection` below `createChatOrchestrator`. When `JSON.stringify` throws, its `catch` now logs a warning and then falls back to `String`. This copies the existing `consultPolicy` pattern.
- **Lint, `onErrorNonError.acceptance.test.ts`:** the test session's timestamp is now a fixed date string instead of `new Date()`. I did edit an acceptance test here, but only that one line: it doesn't touch any assertion, and the file's line numbers stay the same, so the spec links to it still point at the right tests.
- **Changelog:** a new entry under `## [Unreleased]` → `### Fixed` says `onError` now fires for every rejection. A value that isn't an `Error` is wrapped in one, with the original value kept as `cause`. An `Error` still reaches the hook as the same instance, and the caller's rejection is unchanged. It warns that failure counts driven by `onError` may go up.
- **`.lore/dod.md`:** I ticked the changelog facet and added a ticked line for the lint fixes. All facets are now closed.

**Tests:** I wrote no new test this round, because a changelog entry and lint fixes have no behaviour to test. To check the refactor, I ran only `src/orchestration/chatOrchestrator.test.ts`: 28/28 passed. I didn't run the acceptance tests.

**Red tests:** CI's last verdict named no failing tests, only the eslint and changelog checks. So none were mine and there were 0 regressions.

**Unrelated smell, not acted on:** this branch's diff against main also touches `specs/hal-engine-architecture/spec.md` and `specs/hal-engine-tool-input-validation/spec.md`. Those look like spec-link re-anchoring from an earlier round, not part of this ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add a CHANGELOG.md entry under ## [Unreleased] (plus CI lint findings on 836d13e)","tdd_next":"acceptance green"}}