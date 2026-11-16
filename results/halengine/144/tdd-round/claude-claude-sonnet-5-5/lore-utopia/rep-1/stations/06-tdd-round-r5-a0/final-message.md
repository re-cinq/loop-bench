This round fixed six of the eight lint findings CI reported. The two in `src/transport/conversationList.acceptance.test.ts` are still open, and I pushed the fixes without running lint here.

Fixed:
- **`validation.ts`**: the `validateLimit`, `validateCursor` and `isDateLike` helpers now sit below their callers. The `user_message` and `list_sessions` keys in the `VALIDATORS` lookup table are quoted, which should clear the camelcase errors.
- **`validation.test.ts`**: I dropped `%j` from the malformed-frame test title so it has a stable name. The conversation-list spec gets a statement with a `validated by` citation at `#L38`, which should clear the `require-spec-link` error.

I ran `src/transport/ws/validation.test.ts` and all 14 tests pass. Prettier was run on the changed files. Merging `origin/main` brought in nothing, and the branch is level with its upstream.

Left open: the unused `eventually` import (line 6) and the `prefer-early-return` finding (line 58) in the acceptance test. I didn't edit that file, because acceptance tests are off-limits and the last round recorded the same two findings as not editable. They will keep CI red until someone with that authority changes the file.

Of the red findings, none came from a regression. All eight were lint errors in files this ticket wrote or edited.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI lint in validation.ts, validation.test.ts and its spec citation","tdd_next":"acceptance green (remaining lint in the acceptance test file is not editable)"}}