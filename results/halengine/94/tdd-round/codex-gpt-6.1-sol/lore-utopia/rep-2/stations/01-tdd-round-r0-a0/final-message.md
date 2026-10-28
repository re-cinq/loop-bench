Committed and pushed `0854941`. One red-green-refactor round completed: cleanup now runs when `beforeSession` rejects. Updated the spec, changelog, and checklist.

New test: red, then green; final run passed. Reds observed: 1 mine, 0 regressions. Acceptance remains for CI. Branch is synchronized with main and upstream.

Unchanged concerns: non-Error rejection handling and usage accounting.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Run cleanup when beforeSession rejects","tdd_next":"acceptance green"}}