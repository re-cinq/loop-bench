I have fixed the CI reported failures from the previous round:
1. I refactored `src/orchestration/chatOrchestrator.test.ts` to extract the `setupErrorTracking` logic and remove the `no-duplicate-code` `eslint` violations.
2. I added the required inline spec links `([validated by](...))` for the newly added unit tests in `chatOrchestrator.test.ts` to `specs/hal-engine-config-hooks/spec.md`, and then repointed all line numbers using `scripts/repoint-spec-anchors.mjs`.
3. I fixed the non-deterministic `new Date()` call in `src/orchestration/onErrorNonError.acceptance.test.ts`.
4. I added an entry to `CHANGELOG.md` under `## [Unreleased] -> ### Fixed` documenting the behavior change for existing consumers, satisfying the `check-changelog.sh` script.

All verification steps, including `eslint`, `spec-names`, `check-changelog.sh`, and `typecheck`, now pass locally. The tests were run and remain green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI reported failures and add CHANGELOG entry","tdd_next":"acceptance green"}}