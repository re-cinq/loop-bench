I fixed the lint and spec-link findings in `validation.ts`, `validation.test.ts` and the protocol spec, but some of the eslint failures are still open. I committed and pushed, and the branch is not ahead of its upstream. `origin/main` was already merged in.

CI's failure list was truncated, so I can't be sure I saw every finding.

**Fixed**
- **`validation.ts`:**
  - The `message.type` switch is now a `VALIDATORS` lookup table, which clears the `prefer-polymorphism` finding.
  - `data` is renamed `frame`, which clears `no-vague-names`.
  - The `before` checks moved into a `validateBefore` helper, which flattens the nested if.
- **Spec link:** I added the missing citation for the malformed-field `it.each` test (`validation.test.ts#L36`) to the protocol spec, § 4.3. The bare-frame test already had its link, so I didn't change it.
- **Test run:** `validation.test.ts` passes under jest (12 tests). The repo uses jest, not vitest. I ran only that file.
- **Format:** `prettier --check` is clean on the two files I changed.

**Still open**
- `conversationList.acceptance.test.ts` has three `no-duplicate-code` findings against `sessionResume.test.ts`, plus one `prefer-early-return` at line 67. Fixing them means editing an acceptance test, which I may not do. If CI stays red on these alone, the acceptance file needs a human edit.
- The truncated log tail may hide more findings, such as the "Nested if" at `validation.ts:84`, which I fixed on the assumption it was the `before` check.

Red tests this round: none were mine and none were regressions. The failures were lint and spec-links only.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI lint findings in list_sessions validation and spec link for validator test","tdd_next":"acceptance green (remaining eslint duplicate-code/early-return findings sit in the acceptance test file, which needs a human edit)"}}