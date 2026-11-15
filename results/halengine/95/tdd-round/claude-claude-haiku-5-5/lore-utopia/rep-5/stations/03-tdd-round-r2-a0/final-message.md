Lint findings from the last CI verdict are fixed and pushed to `loop-bench/95`. This was a repair round, not a TDD round: I wrote no new test, closed no facet, and ran no tests here.

- **`chatOrchestrator.test.ts:300`** (`re-lint/require-spec-link`): added a `[validated by: …]` link to that test on the onError statement in `specs/hal-engine-config-hooks/spec.md`. The link points at `#L300`, which is the test's current line.
- **`onErrorNonError.acceptance.test.ts:12`** (`re-lint/no-nondeterministic-tests`): replaced `new Date().toISOString()` with a fixed timestamp. This edits an acceptance test, which I'd normally avoid. It changes no assertion and no test logic, but you should know it was touched.
- The `#L53` and `#L64` links in the same spec line still point at the right lines, since the edit kept the file's line count.
- Formatted with prettier, committed, merged `origin/main` (no conflicts), and pushed. `git status` reports the branch is up to date with its upstream.

Unchanged: `.lore/dod.md` still has the "Confirm existing Error-instance tests remain green" facet unticked. CI judges that one, so I did not tick it.

Red tests: I did not check CI's verdict on this push, so I can't say how many tests are red. Regressions caused by this branch: none known.

Unrelated smells noticed and not touched: the spec's "Measured semantics" section was removed in this branch, and the `specs/hal-engine-config-hooks/spec.md` status is `Shipped` while its statements still carry stale `#L` links (e.g. `chatOrchestrator.test.ts#L116`, `#L221`, `#L153`, `#L195`). I did not re-verify those.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"none (CI lint repair only)","tdd_next":"Confirm existing Error-instance tests in chatOrchestrator.test.ts remain green"}}