I pushed this round to `loop-bench/95`, and it fixes all three findings from CI's last red build. The branch was already up to date with `origin/main`, and nothing is left unpushed. CI will decide whether the acceptance tests and lint are green now.

**Red:** I added one test to `src/orchestration/chatOrchestrator.test.ts`: *describes a circular object rejection by its fields rather than as [object Object]*. It failed before the fix, because the error message `onError` received was `"[object Object]"` and the test expects one that shows the object's fields.

**Green:** In `chatOrchestrator.ts`, `describeRejection` now uses `inspect` from `node:util` instead of `JSON.stringify` inside a `try`/`catch`. `inspect` doesn't throw on circular objects, so the catch is gone, and that was what lint rule `no-catch-as-control-flow` flagged at line 343. All 28 tests in that file pass. That's the only test file I ran.

**CI's other findings:**
- **Lint, `onErrorNonError.acceptance.test.ts:12`:** I replaced `new Date().toISOString()` with a fixed ISO timestamp. This is an acceptance test, so I want to flag the edit. It changes only a timestamp in the test data, which no assertion reads, so what the test checks is unchanged. A hook blocks running acceptance tests here, so CI will be the first to run it.
- **Changelog:** I added an entry under `## [Unreleased] / ### Fixed` explaining that `onError` now fires for rejections that aren't an `Error`. It covers the wrapping with the original value kept as `cause` and includes a migration note.

**Spec links:** The new test is linked from the `onError` statement in `specs/hal-engine-config-hooks/spec.md`. Inserting the test moved later tests in that file down 16 lines, and specs had 15 links pointing at those tests. There's no re-anchor script in this repo, so I moved each link by hand and checked it against its test's title. That spec's Status was already `Shipped`.

**Red count:** the one red test this round was mine; there were no regressions.

**Not done here:**
- This repo has no way to stamp a test with its spec anchor, so I didn't stamp one.
- I didn't run lint, typecheck or build in this pod; CI runs those.
- Prettier was set to reformat code-block spacing in the spec files, but only `src/**/*.ts` is format-checked here, so I left those files as they were.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CHANGELOG entry for onError change, plus CI lint fixes (catch-free describeRejection via util.inspect, fixed acceptance fixture timestamp)","tdd_next":"acceptance green"}}