Committed and pushed `af0dc36`; branch is clean and synchronized with main.

- Preserved object and `undefined` causes, including unstringifiable objects.
- Fixed both reported CI lint findings.
- One new test went red, then green; post-refactor: 2 passed. No observed test regressions.
- Acceptance and existing Error-instance checks remain for CI.
- No unrelated improvements identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve object and undefined causes, including unstringifiable objects; repair CI lint findings","tdd_next":"Confirm acceptance and existing Error-instance tests through CI"}}