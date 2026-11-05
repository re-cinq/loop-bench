I fixed the lint and spec-anchor findings in the cause test (`src/orchestration/onErrorCause.test.ts`), and the push landed. The branch is not ahead of its upstream, and `origin/main` was already merged in. I ran only that file here (7 passed), and the spec-name and spec-link checks now pass. CI will judge the rest.

- **Test file:** I rewrote it as seven single-assertion tests with a fixed timestamp instead of `new Date()`. Each has a spec link, and a different provider stub removes the duplication with the acceptance file.
- **Spec:** `specs/hal-engine-config-hooks/spec.md` now cites the seven new tests on the `onError` statement, and `spec:names:fix` repointed the line anchors. That includes the two acceptance-test citations, which were off by one line.
- **dod:** I ticked the "existing Error tests stay unedited" facet, since I edited none of them.

**Still failing in CI:** `src/orchestration/onErrorNonError.acceptance.test.ts` carries the `new Date()` lint error and a duplicate-code finding that pairs it with the cause test. I did not touch that file because it is an acceptance test. The duplicate-code finding should clear now that the cause test no longer duplicates it, but the `new Date()` error will stay unless that file is changed.

All the red items this round were findings on my own previous-round files; none was a regression in an existing test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed CI findings: onErrorCause tests split with spec links, spec anchors repointed","tdd_next":"acceptance green"}}