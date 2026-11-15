Pushed `0d945dd` to `loop-bench/144`; the branch is level with its upstream and `origin/main` was already contained, so the merge needed nothing. CI's red verdict is only partly addressed. The findings in the acceptance test file are still open.

**Round facet closed:** forward `before` in the parsed `list_sessions` frame.
- Red: added a unit test in `validation.test.ts` that `before` is forwarded as sent. It failed because the validator dropped `before`.
- Green: the validator now builds the parsed frame with `limit` and `before` when present. `ListSessionsMessage` gained `before?: {updatedAt: string; sessionId: string}`, which is additive.
- Unit file `validation.test.ts`: 8/8 green when run here. No acceptance test was run in this pod.

**CI findings addressed:**
- `validation.ts` camelcase errors: the validator table is now a `Map`, because prettier would strip quotes added to object keys and bring the error back.
- `validation.test.ts` require-spec-link errors: the spec citations were split into one trailing citation per statement, and a new statement cites the field-stripping test.
- `spec:names` findings: the `%p` `it.each` title was replaced with a literal title, and the stale `#L36` citation on the existing field-stripping statement was re-anchored to `#L51`. `spec:names` and `check:spec-links` now pass.

**CI findings NOT addressed (blocked by the rule against editing acceptance tests):**
- `conversationList.acceptance.test.ts`: four `no-duplicate-code` errors, a `prefer-early-return` error at 67:7, and the red `test` step at 116. The acceptance file is not mine to edit, so these need its owner.
- `sessionResume.test.ts`: three duplicate-code errors that pair with the acceptance file. Fixing them alone would still leave the acceptance side flagged.
- `lore_get_ci_failures` returned 404 for `loop-bench/144`, so I took the verdict from the round brief rather than a live read.

**Red tests:** I wrote one this round, and it went red then green. The CI-red acceptance test is not a regression I caused; it is the expected mid-ticket state. Regressions from my changes: 0 known. CI has not reported on this push yet.

**Discovered, not fixed:**
- `dod.md` ticks "Reject a malformed `before`" but the validator only checks that `before` is an object. The acceptance test also rejects an empty `sessionId`, a 129-char `sessionId`, and an unparseable `updatedAt`, so that facet is not really closed. I left the tick as-is; it should be unticked and re-opened.
- The `drops any field` test exercises a `user_message` frame, not `list_sessions`. The new spec statement is worded generally, so it is accurate, but the list-frame case is not yet pinned by a test.

**Lint and typecheck:** not run in this pod, per the brief. Formatting was run with prettier and left the files unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"forward before cursor in the parsed list_sessions frame","tdd_next":"reject malformed before cursor (sessionId 1-128 chars, parseable updatedAt); then strip userId and unknown fields from the parsed frame"}}