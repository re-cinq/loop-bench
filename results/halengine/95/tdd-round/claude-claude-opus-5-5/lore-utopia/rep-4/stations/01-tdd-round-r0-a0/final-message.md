`onError` now fires for every rejection, not just `Error` instances. This round's commit is pushed to `loop-bench/95` and the branch isn't ahead of its upstream. Merging `origin/main` brought in nothing new, so there was no second push.

**Red:** I added one test to `src/orchestration/chatOrchestrator.test.ts:311`: a provider rejects with `undefined`. It checks that `onError` is called once with an `Error` whose `cause` is `undefined`, and that the caller still gets `undefined` back. Before the fix it failed because `onError` was never called. To make it possible, I widened the test helper `createErrorProvider` to accept any value, not just an `Error`.

**Green:** in `src/orchestration/chatOrchestrator.ts`, the `catch` no longer checks `instanceof Error`. A new `asError` helper passes an `Error` through as the same object and wraps anything else in `new Error(message, {cause})`. A string becomes the message as-is; anything else is turned into JSON, or plain text if that fails. The original value is still what gets re-thrown to the caller. All 27 tests in that file pass, including the three existing `Error` tests, which I didn't edit. That confirms the second facet.

**Refactor:** I found nothing worth changing.

**Spec links:** `specs/hal-engine-config-hooks/spec.md` now says `undefined` is wrapped too and that the original value is kept as the `cause`, with a link to the new test. The anchor script moved 14 links in other specs automatically but skipped this spec, so I fixed its links by hand. Three of them were already one line off before my change: the two acceptance-test links (now `#L53` and `#L64`) and "sums the usage of every round" (now `#L584`). The anchor check now reports no broken links.

**Not checked here:** I ran only my own test file. As instructed, I didn't run the acceptance tests, lint or the typechecker; CI will judge those. I had no CI verdict from an earlier push and no round brief, so none of the red tests are known to be regressions; the only one that was mine is now green.

**Left open:** the `CHANGELOG.md` entry under `## [Unreleased]` is the next round's job, and the two acceptance tests should go green with this fix.

**Something I noticed but didn't touch:** the anchor script refuses to fix a spec whose set of links differs from `origin/main`, so any branch that adds a link has to fix that spec's line numbers by hand.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections to an Error (cause preserved) so onError always fires; existing Error-instance tests confirmed green unedited","tdd_next":"Add a CHANGELOG.md entry under ## [Unreleased] describing the onError behaviour change for existing consumers"}}