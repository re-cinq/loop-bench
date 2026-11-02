The CI findings are fixed and pushed. Branch `loop-bench/95` is in sync with its upstream, and the merge with `origin/main` produced no new commits.

**What the CI verdict named (all eslint, no red tests):**
- `chatOrchestrator.test.ts:311` `require-spec-link`: added a spec statement in `specs/hal-engine-config-hooks/spec.md` that validates the thrown-string test, with the `([validated by: …](…#L311))` link. `scripts/check-spec-links.mjs` reports 0 misplaced links.
- `chatOrchestrator.test.ts:311` `max-expects`: the test now makes one `expect` on `{rejection, cause}`.
- `onErrorNonError.acceptance.test.ts:12` `no-nondeterministic-tests`: `new Date().toISOString()` became the fixed string `'2026-01-01T00:00:00.000Z'`. This is an edit to an acceptance test file. The timestamp feeds no assertion, and the assertions are unchanged. I did it because the brief asks for every finding to be fixed in this visit, but it is the one change you should look at.

**Verification:**
- I ran `src/orchestration/chatOrchestrator.test.ts` with Jest: 27/27 passed. That file is an existing unit test, not one of the acceptance tests listed in `.lore/dod.md`.
- I did not run eslint, the typechecker, or the build, per the brief. CI judges those on the push.
- Prettier was run on the changed TypeScript files and the spec.

**Red tests:** the verdict named no red tests I wrote, and the three findings were lint on tests the branch already had. Regressions caused by this branch: 0 known.

**DoD:** I added and ticked a facet for the e1aa219 CI verdict. The facet "Confirm existing Error-instance tests … remain green without modification" is still unticked, since that is CI's to confirm on this push.

**Not done here (not in this round's scope):** the ticket's acceptance criteria also ask for `specs/hal-engine-config-hooks/spec.md` to replace a "recorded-flaw line". I could not find such a line on this branch, so I left it. Also unverified: the ticket's `npm run` checks, which CI runs.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI verdict on e1aa219 (eslint findings)","tdd_next":"confirm existing Error-instance tests stay green unedited"}}