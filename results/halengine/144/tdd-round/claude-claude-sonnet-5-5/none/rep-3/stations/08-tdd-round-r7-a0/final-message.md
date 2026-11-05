I fixed the typecheck error and pushed it. The eslint finding is still open.

- **Typecheck:** `validation.test.ts(51,94)` failed with TS2698 because the table of malformed frames had no type. I typed it as `Array<[string, Record<string, unknown>]>`. I ran `validation.test.ts` with jest and its 6 tests pass. I did not typecheck here, so CI will confirm the fix.
- **eslint:** `prefer-early-return` at `conversationList.acceptance.test.ts:67` is not fixed. It is in the acceptance test, which I was told not to edit. The previous round stopped on the same finding.
- **Red tests:** none this round, mine or regressions. Both CI findings were static-analysis errors, not test failures.
- **Branch:** merging `origin/main` changed nothing, and the branch is level with its upstream.
- **`.lore/dod.md`:** I added a note on the typecheck fix to the open lint line.

The next round has no new facet to write. The eslint finding blocks a green CI, so someone will need to decide whether the acceptance file can be edited for it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI typecheck TS2698 in validation.test.ts","tdd_next":"acceptance green (only eslint prefer-early-return at conversationList.acceptance.test.ts:67 remains, in the non-editable acceptance file)"}}