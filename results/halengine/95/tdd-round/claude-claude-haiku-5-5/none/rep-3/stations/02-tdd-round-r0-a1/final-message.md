This round closed the CHANGELOG facet and fixed two broken spec links. No tests were run in this pod, and no red test was written for it.

- **No red test this round:** the remaining facet is a prose CHANGELOG entry. A test for it would have to read the repo's own source text, which the rules forbid, so there was no failing test to write. The code change itself was already committed (`a170512`) and its acceptance tests are CI's to judge.
- **Spec links fixed:** the two `validated by` links on the "any rejection inside the turn" statement in `specs/hal-engine-config-hooks/spec.md` pointed at `onErrorNonError.acceptance.test.ts#L52` and `#L63`. The tests start at lines 53 and 64, so I corrected them. This was by hand, since there is no reanchor script in the repo.
- **CHANGELOG:** added an entry under `## [Unreleased]` → `### Fixed`. It says `onError` now fires for every rejection, that the hook gets an `Error` with the original value as `cause`, that an `Error` passes through as the same instance, that the caller's rejection is unchanged, and includes a migration note pointing consumers at `error.cause`.
- **Dod.md:** ticked the CHANGELOG facet. The "confirm existing `Error`-instance tests remain green" facet is still unticked. I read the change and believe those tests stay green, since `Error` instances pass through `toError` unchanged, but I have not verified that by running them here. CI will show it.
- **Branch state:** committed as `2efa42e` and pushed. `origin/main` merged in with nothing to merge, and the branch matches its upstream.

Unrelated things I noticed and did not touch: the `beforeSession`-escapes-`try` behaviour is out of scope (its own issue), and the spec's line 17 link `#L116` was not re-verified because that statement isn't mine to change this round.

Round outcome: the CHANGELOG facet is closed and the branch is pushed. Acceptance tests may still be red until CI runs.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CHANGELOG.md entry under [Unreleased] describing the onError non-Error behaviour change; spec link line numbers corrected","tdd_next":"confirm existing Error-instance tests in src/orchestration/chatOrchestrator.test.ts stay green unedited (CI verdict)"}}