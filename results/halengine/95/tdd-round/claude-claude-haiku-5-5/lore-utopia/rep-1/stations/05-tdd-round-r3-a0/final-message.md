Round delivered: CI's verdict on 5da1751 is addressed and pushed as one commit on `loop-bench/95`. The branch is not ahead of its upstream, and the `origin/main` merge produced nothing new.

**What CI reported and what I changed**

- **spec-names (red):** 15 `[validated by]` citations pointed at stale `#Lnn` lines. I ran `node scripts/check-spec-anchor-names.mjs --fix`, which repointed all 15 by test name. A re-run of the check now exits 0 with 605 citations.
- **eslint `require-spec-link` (red, 4 findings):**
  - Three of the four tests (error path, no hooks, validation-rejection) had citations that were only stale, so the anchor fix covers them.
  - The fourth, "joins the text of every round, not only the last" (`chatOrchestrator.test.ts`), had no spec statement at all. I added one to `specs/hal-engine-config-hooks/spec.md` under the `afterModelResponse` bullets, with a `#L531` citation.
- **Formatting:** ran prettier over the changed files; nothing needed reformatting.
- **dod.md:** appended and ticked a facet for the 5da1751 verdict.

**Tests and verification**

- The round ran no tests here. I did not run the Jest suite or the acceptance tests, and did not run eslint (per the pod rules). The eslint fixes are verified by reading the rule's expectations, not by a local lint run.
- I did not run the acceptance tests or the test file I edited. CI will judge the push.
- Regressions: none identified locally. I could not read CI's verdict on the new push, because `lore_get_ci_failures` returned "branch not found" for `loop-bench/95` (it first complained it could not detect the branch, so the call needs a branch the gateway recognises).

**Facets**

- Closed this round: CI verdict on 5da1751.
- Still open: confirm the existing `Error`-instance tests stay green without edits. This is the next round's facet.

**Choices I made**

- Used the repo's own `check-spec-anchor-names.mjs --fix` rather than the `reanchor.mjs` the brief mentions, since `scripts/spec-links/reanchor.mjs` does not exist in this repo.
- Wrote the new spec statement as a one-sentence bullet, matching the surrounding `afterModelResponse` bullets.

**Unrelated smells noticed (not acted on)**

- The config-hooks spec's `Status` header row reads `Shipped`, while the repo's CLAUDE.md says it should track test-citation coverage. I left it alone.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI verdict on 5da1751: eslint require-spec-link and spec-names anchors","tdd_next":"confirm existing Error-instance onError tests remain green unedited"}}