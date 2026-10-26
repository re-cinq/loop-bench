The CI finding is fixed and pushed, but the ticket is not done. The spec's `Status` was `Shipped` while two testable statements had no test link, so the lint gate went red.

- **Change:** `specs/hal-engine-config-hooks/spec.md` status is now `In Progress`. The lint rule's own message offered this as the fix. I did not link the statements to tests, because statement 22 ("what a hook can assume about the turn") has no test that pins it, and I did not want to attach a link that does not validate it.
- **Facet recorded:** `.lore/dod.md` has a new unchecked facet to link the two remaining statements, then set the status back to `Shipped`.
- **Verification:** I ran `scripts/check-spec-status.mjs` on the spec. It reports 0 status findings and 2 unlinked statements, which matches the expected state. I did not run eslint, since it OOMs in this pod. CI will judge the push.
- **Delivery:** committed as `9c5d42d` with the Haiku co-author line, pushed, and merged `origin/main` (no new merge commit was needed). The branch is not ahead of its upstream.
- **Tests:** this round ran no tests here. I did not write a test and did not touch the acceptance test.
- **Red tests:** none of mine. The only CI failure was the spec-status lint error, so there are no regressions.
- **Not touched:** the `instanceof Error` gate on `onError` and the `lastUsage` under-count are out of scope per the ticket; I noticed neither needs action this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"none (CI lint fix: spec status set to In Progress)","tdd_next":"Link remaining unlinked spec statements to tests, then set spec status back to Shipped"}}