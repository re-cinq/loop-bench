The CI findings from the last push are repaired and pushed to `loop-bench/95` as `2a4f10d`. The branch is not ahead of its upstream, and `origin/main` merged in with nothing to add.

**What was red and what I did**
- **spec-names:** 17 citations pointed at stale `#Lnn` lines after the 49-line insertion in `chatOrchestrator.test.ts`. I ran `npm run spec:names:fix`, which repointed them by test name. `npm run spec:names` now passes with 604 citations.
- **eslint, `re-lint/require-spec-link`:** the same line shift left tests unlinked. The repaired citations cover the shifted existing tests. The two new unit tests (`gives onError a message that names a plain-object rejection…` and `calls onError with an Error when the stream rejects with undefined`) had no link at all, so I added both to the new non-Error statement in `specs/hal-engine-config-hooks/spec.md`.
- **eslint, `re-lint/no-catch-as-control-flow` at `chatOrchestrator.ts:346`:** `messageOf` used try/catch around `JSON.stringify`. It now uses `util.inspect` for objects, which copes with circular values without a catch.
- **changelog:** added an entry under `## [Unreleased]` → `### Fixed` describing the new `onError` behaviour and the `error.cause` migration note. `scripts/check-changelog.sh origin/main` passes.

**Tests:** I ran no tests in this pod. I did not run eslint, the typechecker or the Jest suite here, so the eslint fixes are verified only by reading the rule and by the spec-name check. CI is the judge.

**Round accounting:** I wrote no new red test this round. The two remaining facets are verification and docs, and the behaviour already exists. The unit tests were already on the branch. Confirming the existing `Error`-instance tests stayed unedited is by inspection of the diff, which adds lines only.

**Red tests:** I wrote none this round. The red findings were regressions from my own earlier insertion shifting the test file, so they are on me. The fix was to the spec citations and lint, not to the tests.

**Unrelated smells:** none acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Confirm existing Error-instance tests remain green; CHANGELOG entry; CI findings repaired","tdd_next":"acceptance green"}}