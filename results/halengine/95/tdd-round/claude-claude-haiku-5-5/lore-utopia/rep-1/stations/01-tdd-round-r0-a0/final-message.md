Round done for facet 1 of #95. The code change is committed and pushed to `loop-bench/95`, and the branch is in sync with its upstream.

- **Red:** I added `wraps a thrown string as the cause of the Error passed to onError` to `src/orchestration/chatOrchestrator.test.ts`. It failed because `onError` received no `Error` for the string rejection.
- **Green:** `chatOrchestrator.ts` now calls `onError` for every rejection. A non-`Error` value is wrapped in an `Error` with the original as `cause`, and the caller still gets the original value. An `Error` passes through as the same instance, so the existing tests are untouched. The new test now passes.
- **Refactor:** nothing needed; the change is two small helpers.
- **Tests run here:** only my new test, by file and name, through Jest (`node --experimental-vm-modules node_modules/jest/bin/jest.js`), since the repo uses Jest rather than Vitest. I did not run the acceptance tests, the full suite, lint, typecheck or build. Prettier was run on the two changed source files.
- **Tests:** 1 red test was mine, and it went green. Regressions: none known, but I have no CI verdict for this push.
- **dod.md:** facet 1 is ticked. Facets 2 (existing `Error` tests stay green) and 3 (CHANGELOG entry) are still open. Facet 2 is a CI check, so I did not tick it.
- **Commit:** I amended the first commit to add the required `Co-Authored-By` trailer and a subject under 50 characters, then force-pushed with a lease. The branch had no other pushes on it. The `Co-Authored-By` trailer is the only attribution line I added.
- **Not done:** the spec at `specs/hal-engine-config-hooks/spec.md` already states the new guarantee, so I left it alone. I also did not add a spec link for the new `cause` test, since the spec does not mention `cause`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejection to Error in chatOrchestrator.ts","tdd_next":"CHANGELOG entry under Unreleased (facet 3); facet 2 is CI's to confirm"}}