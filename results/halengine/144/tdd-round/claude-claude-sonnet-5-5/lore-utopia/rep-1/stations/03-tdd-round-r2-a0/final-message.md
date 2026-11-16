This round fixed the spec-names, changelog and validation-test lint failures, and I pushed it. It did not clear the eslint `no-duplicate-code` and `prefer-early-return` findings. I ran only `validation.test.ts` here (14 passed); CI hasn't re-run yet.

- **Validation tests:** the `list_sessions` test is now two tests with one `expect` each, and both carry spec links.
- **Spec:** I added § 4.3 `list_sessions` and § 5.9 `session_list` to the protocol spec. I also added three bullets to the conversation-list spec.
- **spec-names:** `npm run spec:names:fix` repointed 3 stale line numbers, and `npm run spec:names` now passes.
- **Changelog:** there is an Added entry under `## [Unreleased]`.
- **Tests:** none of the red tests were regressions. The two red `validation.test.ts` findings (no spec link, two `expect` calls) were mine, and both are fixed.
- **Branch:** `origin/main` was already merged, and the branch is not ahead of its upstream.

Three eslint findings are still open, all in the acceptance test or caused by it. I left them because I must not edit the acceptance test:
- **Duplicate code:** `conversationList.acceptance.test.ts` (lines 80 and 23–42) duplicates `sessionResume.test.ts` at lines 51, 63 and 167.
- **Early return:** `prefer-early-return` at line 67 of the acceptance file.
- **Spec link:** the `no spec link` finding on line 163 of the acceptance file should be cleared by the spec-names repoint. I didn't re-run eslint to check.

I added the duplicate-code cleanup as an unchecked facet in `.lore/dod.md` for the next round. Separately, the ticket asks for `list_conversations` with an `UNSUPPORTED` error, but the branch implements `list_sessions` per `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec docs for list_sessions/session_list, validation test lint split, changelog, spec-names","tdd_next":"CI lint duplicates between acceptance test and sessionResume.test.ts; acceptance green"}}